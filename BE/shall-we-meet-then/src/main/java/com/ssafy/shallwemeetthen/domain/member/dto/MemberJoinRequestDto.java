package com.ssafy.shallwemeetthen.domain.member.dto;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberJoinRequestDto {

    @NotBlank(message = "이메일은 빈 값일 수 없습니다")
    @Email(message = "이메일 형식에 맞지 않습니다.")
    private String email;

    @NotBlank(message = "비밀번호는 빈 값일 수 없습니다")
    @Size(min=4,max=12,message = "비밀번호 형식에 맞지 않습니다.")
    private String password;

    @Builder
    public MemberJoinRequestDto(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
