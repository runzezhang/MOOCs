import java.util.Scanner;

public class Change {
    private static int getChange(int m) {
        int coin1=1;
        int coin5=5;
        int coin10=10;
        int number=0;
        if(m==0){
            return number;//write your code here
        }else{
            while(m>=coin10){
                number++;
                m=m-coin10;
            }
            while(m>=coin5){
                number++;
                m=m-coin5;
            }
            while(m>=coin1){
                number++;
                m=m-coin1;
            }
        }
        return number;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int m = scanner.nextInt();
        System.out.println(getChange(m));

    }
}

