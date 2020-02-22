package dz.ade.pfe.utils.collectionutils;

import java.util.List;

public class Ordering {

    public static boolean isSequentialListStartWith(List<Integer> list, int start) {
        int i = 0;
        int size = list.size();
        if ((size == 0) || (size == 1 && list.get(0) == start)) {
            return true;
        } else {
            if (list.get(0) != start) {
                return false;
            }
            while (i < size - 1) {
                Integer prev = list.get(i);
                Integer next = list.get(i + 1);
                if ((next - prev) != 1) {
                    return false;
                }
                i++;
            }
        }

        return true;
    }
}
