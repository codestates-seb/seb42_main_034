package com.project.tripAdvisor.location.controller;
import com.project.tripAdvisor.location.service.LocationService;
import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.member.service.MemberFindService;
import com.project.tripAdvisor.member.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
public class LocationController {
    private final LocationService locationService;
    private final MemberService memberService;
    private final MemberFindService memberFindService;

    public LocationController(LocationService locationService, MemberService memberService,MemberFindService memberFindService) {
        this.locationService = locationService;
        this.memberService = memberService;
        this.memberFindService=memberFindService;
    }

    @Transactional
    @PostMapping("/location")
    public ResponseEntity<String> registerLocation(Principal principal,
                                                   @RequestParam Double latitude,
                                                   @RequestParam Double longitude){
        Member member = memberFindService.findMyProfile(principal.getName());
        String location = locationService.getLocationName(latitude,longitude);
        member.setLocation(location);
        //memberRepository.save(member);
        //이후 member location 필드에 해당 location 추가후 save
        return ResponseEntity.ok("Location added to member successfully");
    }

    /**
     * patchMapping 과 getMapping의 경우 member 단에서 할지?
     * 안할꺼면 위치 정보만을 업데이트하는 버튼이 최소한 필요할듯
     */
    @PatchMapping("/location")
    public ResponseEntity<String> updateLocation(Principal principal,
                                                 @RequestParam Double latitude,
                                                 @RequestParam Double longitude){
        Member member = memberFindService.findMyProfile(principal.getName());
        String location = locationService.getLocationName(latitude,longitude);
        member.setLocation(location);
        //memberRepository.save(member);
        return ResponseEntity.ok("Location updated successfully");
    }
    @GetMapping("/location")
    public ResponseEntity<String> getLocation(Principal principal){
        Member member =memberFindService.findMyProfile(principal.getName());
        if(member == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(member.getLocation());
    }
}