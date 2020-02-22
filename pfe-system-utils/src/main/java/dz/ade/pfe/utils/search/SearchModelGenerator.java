package dz.ade.pfe.utils.search;

import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class SearchModelGenerator {

    private static final String REQUEST_PARAM_OFFSET = "offset";
    private static final String REQUEST_PARAM_LIMIT = "limit";

    public static SearchModel generate(Map<String, String> allParams, GenericSpecificationsBuilder specificationsBuilder,
                                       List<String> paramsToBeIgnored) {
        String[] parts;
        List<Sort.Order> orders = new ArrayList<>();
        for (Map.Entry<String, String> entry : allParams.entrySet()) {
            if (!entry.getKey().equals(REQUEST_PARAM_LIMIT) &&
                    !entry.getKey().equals(REQUEST_PARAM_OFFSET) &&
                    !paramsToBeIgnored.contains(entry.getKey())) {
                if (!entry.getValue().startsWith("|")) {
                    parts = entry.getValue().split("\\|");
                    specificationsBuilder.with(null, entry.getKey(), ":", parts[0],
                            "*", "*");
                }

                if (entry.getValue().contains("desc")) {
                    orders.add(Sort.Order.desc(entry.getKey()));
                } else if (entry.getValue().contains("asc")) {
                    orders.add(Sort.Order.asc(entry.getKey()));
                } else {
                    orders.add(Sort.Order.by(entry.getKey()));
                }
            }
        }

        return SearchModel.builder()
                .limit(Integer.parseInt(allParams.get(REQUEST_PARAM_LIMIT) != null ? allParams.get(REQUEST_PARAM_LIMIT) : "10"))
                .offset(Integer.parseInt(allParams.get(REQUEST_PARAM_OFFSET) != null ? allParams.get(REQUEST_PARAM_OFFSET) : "0"))
                .sort(Sort.by(orders))
                .specification(specificationsBuilder.build())
                .build();
    }
}
