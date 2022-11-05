package com.ssafy.shallwemeetthen.domain.groupmember.repository;

import com.ssafy.shallwemeetthen.domain.group.entity.Groups;
import com.ssafy.shallwemeetthen.domain.groupmember.entity.GroupMember;
import com.ssafy.shallwemeetthen.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupMemberRepository extends JpaRepository<GroupMember, Long> {

    Optional<GroupMember> findByGroupSeqAndMemberSeq(Long groupSeq, Long memberSeq);

    boolean existsByGroupSeqAndNickname(Long groupSeq, String nickname);

    boolean existsByGroupAndMember(Groups groups, Member member);
}