import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  Modal,
  Button
} from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postComment, postFavorite } from "../redux/ActionCreators";

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  };
};

const mapDispatchToProps = dispatch => ({
  postFavorite: dishId => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment))
});

function RenderDish({ dish, favorite, markFavorite, openCommentForm }) {
  if (dish != null) {
    return (
      <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
        <Text style={{ margin: 10 }}>{dish.description}</Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Icon
            raised
            reverse
            name={favorite ? "heart" : "heart-o"}
            type="font-awesome"
            color="#f50"
            onPress={() =>
              favorite ? console.log("Already favorited") : markFavorite()
            }
          />
          <Icon
            raised
            reverse
            name="pencil"
            type="font-awesome"
            color="#512DA8"
            onPress={() => openCommentForm()}
          />
        </View>
      </Card>
    );
  } else {
    return <View />;
  }
}

function RenderComments({ comments }) {
  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Rating
          startingValue={item.rating}
          readonly
          imageSize={10}
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            padding: 5
          }}
        />
        <Text style={{ fontSize: 12 }}>
          {"--" + item.author + ", " + item.date}
        </Text>
      </View>
    );
  };

  if (comments != null) {
    return (
      <Card title="Comments">
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={item => item.id.toString()}
        />
      </Card>
    );
  } else {
    return <View />;
  }
}

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState();
  }

  static navigationOptions = {
    title: "Dish Details"
  };

  defaultState() {
    return {
      rating: 3,
      author: "",
      comment: "",
      showCommentForm: false
    };
  }

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  resetCommentForm() {
    this.setState(this.defaultState());
  }

  handleComment(dishId) {
    this.props.postComment(
      dishId,
      this.state.rating,
      this.state.author,
      this.state.comment
    );
    this.resetCommentForm();
  }

  openCommentForm() {
    this.setState({ showCommentForm: true });
  }

  setRating(rating) {
    this.setState({ rating });
    console.log(rating);
  }

  setAuthor(author) {
    this.setState({ author });
  }

  setComment(comment) {
    this.setState({ comment });
  }

  render() {
    const dishId = this.props.navigation.getParam("dishId", "");

    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some(el => el === dishId)}
          markFavorite={() => this.markFavorite(dishId)}
          openCommentForm={() => this.openCommentForm()}
        />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showCommentForm}
          onDismiss={() => {
            this.resetCommentForm();
          }}
          onRequestClose={() => {
            this.resetCommentForm();
          }}
        >
          <View style={styles.modal}>
            <Rating
              minValue={1}
              startingValue={3}
              showRating
              onFinishRating={rating => this.setRating(rating)}
            />
            <Input
              placeholder="Author"
              leftIcon={<Icon name="user" type="font-awesome" />}
              onChangeText={author => this.setAuthor(author)}
            />
            <Input
              placeholder="Comment"
              leftIcon={<Icon name="comment" type="font-awesome" />}
              onChangeText={comment => this.setComment(comment)}
            />
            <Button
              onPress={() => {
                this.handleComment(dishId);
              }}
              color="#512DA8"
              title="SUBMIT"
            />
            <Button
              onPress={() => {
                this.resetCommentForm();
              }}
              color="#6c757d"
              title="CANCEL"
            />
          </View>
        </Modal>
        <RenderComments
          comments={this.props.comments.comments.filter(
            comment => comment.dishId === dishId
          )}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20
  },
  // Note formLabel and formItem will be inside formRow
  // so the flexDirection will be row, and formLabel will be 2x size formItem
  formLabel: {
    fontSize: 18,
    flex: 2
  },
  formItem: {
    flex: 1
  },
  modal: {
    justifyContent: "center",
    marginTop: 80,
    marginLeft: 20,
    marginRight: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#512DA8",
    textAlign: "center",
    color: "white",
    marginBottom: 20
  },
  modalText: {
    fontSize: 18,
    margin: 10
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dishdetail);
