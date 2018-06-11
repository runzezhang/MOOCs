
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.Scanner;

public class FractionalKnapsack {
    private static double getOptimalValue(int capacity, int[] values, int[] weights) {
        double value = 0;
        //write your code here
        if(capacity==0){
            return value;
        }
        ArrayList<Item> items = new ArrayList<Item>();
        for(int i=0; i<values.length; i++){
            Item item = new Item(values[i], weights[i]);
            items.add(item);
        }
        Collections.sort(items, Collections.reverseOrder());
        Iterator<Item> thing = items.iterator();
        while(capacity > 0 && thing.hasNext()){
            Item item = thing.next();
            if (capacity >= item.weight){
                capacity -= item.weight;
                value += item.value;
            }else{
                value += capacity*item.Price;
                break;
            }
        }
        return value;
    }

    public static void main(String args[]) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        int capacity = scanner.nextInt();
        int[] values = new int[n];
        int[] weights = new int[n];
        for (int i = 0; i < n; i++) {
            values[i] = scanner.nextInt();
            weights[i] = scanner.nextInt();
        }
        System.out.println(getOptimalValue(capacity, values, weights));
    }
}

class Item implements Comparable<Item>{
    public int weight, value;
    public double Price;
    Item(int value, int weight){
        this.value = value;
        this.weight = weight;
        Price = (double)value/weight;
    }
    @Override
    public int compareTo(Item other){
        if (this.Price > other.Price) return 1;
        if (this.Price < other.Price) return -1;
        return 0;
    }
}