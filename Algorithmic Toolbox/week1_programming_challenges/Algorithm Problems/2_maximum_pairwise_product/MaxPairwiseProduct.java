import java.util.*;
import java.io.*;

public class MaxPairwiseProduct {
    static long getMaxPairwiseProduct(int[] numbers) {
        int result = 0;
        int n = numbers.length;
        int largest_index=-1;
        int second_index=-1;
        for(int i=0; i<n; i++)
        {
            if(largest_index==-1||numbers[i]>numbers[largest_index]){
                largest_index=i;
            }
        }
        
        for(int j=0; j<n; j++)
        {
            if(j!=largest_index&&(second_index==-1||numbers[j]>numbers[second_index]))
            {
                second_index=j;
            }
        }
        // for (int i = 0; i < n; ++i) {
        //     for (int j = i + 1; j < n; ++j) {
        //         if (numbers[i] * numbers[j] > result) {
        //             result = numbers[i] * numbers[j];
        //         }
        //     }
        // }
        return ((long)numbers[largest_index]*numbers[second_index]);
    }

    public static void main(String[] args) {
        FastScanner scanner = new FastScanner(System.in);
        int n = scanner.nextInt();
        int[] numbers = new int[n];
        for (int i = 0; i < n; i++) {
            numbers[i] = scanner.nextInt();
        }
        System.out.println(getMaxPairwiseProduct(numbers));
    }

    static class FastScanner {
        BufferedReader br;
        StringTokenizer st;

        FastScanner(InputStream stream) {
            try {
                br = new BufferedReader(new InputStreamReader(stream));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        String next() {
            while (st == null || !st.hasMoreTokens()) {
                try {
                    st = new StringTokenizer(br.readLine());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            return st.nextToken();
        }

        int nextInt() {
            return Integer.parseInt(next());
        }
    }

}