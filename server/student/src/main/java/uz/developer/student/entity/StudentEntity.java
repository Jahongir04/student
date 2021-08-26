package uz.developer.student.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;
import uz.developer.student.enums.CourseEnum;

import java.util.Date;

@Document
@AllArgsConstructor
@NoArgsConstructor
@Data
public class StudentEntity {

    @Id
    private String id;

    private String name;

    private String surname;

    private String fatherName;


    private int course;

    @JsonFormat(pattern="yyyy-MM-dd")
    private Date age;

    private String region;

    public StudentEntity(String name, String surname, String fatherName, int course, Date age, String region) {
        this.name = name;
        this.surname = surname;
        this.fatherName = fatherName;
        this.course = course;
        this.age = age;
        this.region = region;
    }
}
