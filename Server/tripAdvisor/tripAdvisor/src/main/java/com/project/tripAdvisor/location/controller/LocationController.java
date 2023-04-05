package com.project.tripAdvisor.location.controller;
import com.project.tripAdvisor.location.service.LocationService;
import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.member.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
@RestController
public class LocationController {
    private final LocationService locationService;
    private final MemberService memberService;

    public LocationController(LocationService locationService, MemberService memberService) {
        this.locationService = locationService;
        this.memberService = memberService;
    }

    @Transactional
    @PostMapping("/location/{member-id}")
    public ResponseEntity<String> registerLocation(@PathVariable("member-id") Long memberId,
                                                   @RequestParam Double latitude,
                                                   @RequestParam Double longitude){
        Member member = memberService.findMember(memberId);
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
    @PatchMapping("/location/{member-id}")
    public ResponseEntity<String> updateLocation(@PathVariable("member-id") Long memberId,
                                                 @RequestParam Double latitude,
                                                 @RequestParam Double longitude){
        Member member = memberService.findMember(memberId);
        String location = locationService.getLocationName(latitude,longitude);
        member.setLocation(location);
        //memberRepository.save(member);
        return ResponseEntity.ok("Location updated successfully");
    }
    @GetMapping("/location/{member-id}")
    public ResponseEntity<String> getLocation(@PathVariable("member-id") Long memberId){
        Member member = memberService.findMember(memberId);
        if(member == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(member.getLocation());
    }
}