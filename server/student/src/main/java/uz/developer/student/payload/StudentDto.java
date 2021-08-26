package uz.developer.student.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StudentDto {

    private String name;

    private String surname;

    private String fatherName;

    private int course;

    private Date age;

    private String region;

    public boolean isFull(){
        if (name!=""&&surname!=""&&fatherName!=""&&age!=null&&region!=""){
            return true;
        }else {
            return false;
        }
    }
}
