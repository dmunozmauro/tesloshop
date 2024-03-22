import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La password debe tener letras mayúsculas, minúsculas y números'
    })
    password: string

    @IsString()
    @MinLength(1)
    fullName: string;
}
