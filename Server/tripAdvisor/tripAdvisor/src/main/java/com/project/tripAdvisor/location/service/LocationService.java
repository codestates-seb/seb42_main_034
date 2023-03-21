/*
package com.project.tripAdvisor.location.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
//import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class LocationService {
    private static final String NAVER_MAP_API_URL = "https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=%s,%s&output=json&orders=addr";
    private final RestTemplate restTemplate;
    private final String naverMapClientId;
    private final String naverMapClientSecret;
    */
/**
     * 추후 프론트 단에서 넘겨주는 데이터로 하여금 확인이 가능할 때, "서울특별시,경기도" -> 서울/경기로 변경해서 저장하는 등의 로직을
     * 추가 해야합니다. 임시라 일단 부산광역시와 같은 경우도 생각하지않고 넣어둔 상태입니다.
     *//*

    private final List<String> ALLOWED_REGIONS = Arrays.asList("서울특별시", "경기도", "충청도", "전라도", "경상도", "강원도", "제주도");

    */
/**
     * RestTemplateBuilder을 왜 DI 받는지?
     * -> RestTemplate의 구성 옵션을 쉽게 추가하거나 변경할 수 있다고함.
     *//*

    public LocationService(RestTemplateBuilder restTemplateBuilder,
                           @Value("${naver.map.client.id}") String naverMapClientId,
                           @Value("${naver.map.client.secret}") String naverMapClientSecret) {
        this.restTemplate = restTemplateBuilder.build();
        this.naverMapClientId = naverMapClientId;
        this.naverMapClientSecret = naverMapClientSecret;
    }


    public String getLocationName(Double latitude, Double longitude){
        */
/**
         * ?"%s?coords=%s,%s&output=json"
         * API 요청을 보내기위해 문자열 생성
         *//*

        String url = String.format("%s?coords=%s,%s&output=json", NAVER_MAP_API_URL, longitude, latitude);

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-NCP-APIGW-API-KEY-ID", naverMapClientId);
        headers.set("X-NCP-APIGW-API-KEY", naverMapClientSecret);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode node = objectMapper.readTree(response.getBody());
            JsonNode addressNode = node.get("results").get(0).get("region").get("area1");
            String locationName = addressNode.get("name").asText();
            if (ALLOWED_REGIONS.contains(locationName)) {
                return locationName;
            } else {
                return null;
            }
        } catch (IOException e) {
            throw new RuntimeException("Error occurred while parsing location data", e);
        }
    }
}
*/
