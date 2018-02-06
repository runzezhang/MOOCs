import java.util.*;

public class LCM {
  private static long lcm_naive(int a, int b) {
            int current_gcd = 1;
            if(a<b){
                int tmp=a;
                a=b;
                b=tmp;
            }
            if(a%b==0){
                return b;
            }else{
                return lcm_naive(b,a%b);
            }
  }

  public static void main(String args[]) {
    Scanner scanner = new Scanner(System.in);
    int a = scanner.nextInt();
    int b = scanner.nextInt();

    System.out.println((long)a*b/(lcm_naive(a, b)));
  }
}
