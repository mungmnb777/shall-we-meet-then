package com.ssafy.shallwemeetthen.domain.group.dto;

import com.ssafy.shallwemeetthen.domain.group.entity.Groups;
import com.ssafy.shallwemeetthen.domain.group.entity.enumerate.AgreeState;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class GetGroupListResponseDto {


    private Long seq;

    private String name;

    private String invitationCode;

    private LocalDateTime openDateTime;

    private int headcount;
    private LocalDateTime createDate;

    private AgreeState groupMemberAgree;


    public GetGroupListResponseDto(Groups groups) {
        this.seq = groups.getSeq();
        this.name = groups.getName();
        this.invitationCode = groups.getInvitationCode();
        this.openDateTime = groups.getOpenDateTime();
        this.headcount = groups.getHeadcount();
        this.createDate = groups.getCreateDate();
        this.groupMemberAgree = getGroupMemberAgree();
    }

    @Builder
    public GetGroupListResponseDto(Long seq, String name, String invitationCode, LocalDateTime openDateTime, int headcount, LocalDateTime createDate, AgreeState groupMemberAgree) {
        this.seq = seq;
        this.name = name;
        this.invitationCode = invitationCode;
        this.openDateTime = openDateTime;
        this.headcount = headcount;
        this.createDate = createDate;
        this.groupMemberAgree = groupMemberAgree;
    }

    public GetGroupListResponseDto(String invitationCode) {
        this.invitationCode = invitationCode;
    }
}

