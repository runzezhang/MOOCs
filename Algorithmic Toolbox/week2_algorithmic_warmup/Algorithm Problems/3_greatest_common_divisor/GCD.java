import java.util.*;

public class GCD {
  private static int gcd_naive(int a, int b) {

            int current_gcd = 1;
            if(a<b){
                int tmp=a;
                a=b;
                b=tmp;
            }
            if(a%b==0){
                return b;
            }else{
                return gcd_naive(b,a%b);
            }
  }

  public static void main(String args[]) {
    Scanner scanner = new Scanner(System.in);
    int a = scanner.nextInt();
    int b = scanner.nextInt();

    System.out.println(gcd_naive(a, b));
  }
}
