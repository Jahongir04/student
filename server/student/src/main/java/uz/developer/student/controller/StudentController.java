package uz.developer.student.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uz.developer.student.entity.StudentEntity;
import uz.developer.student.payload.response.ApiResponse;
import uz.developer.student.payload.CourseInterface;
import uz.developer.student.payload.StudentDto;
import uz.developer.student.repository.StudentRepositary;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static uz.developer.student.payload.response.ApiResponseStatus.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/student")
public class StudentController {
    private final MongoTemplate mongoTemplate;
    private final StudentRepositary studentRepositary;

    @Autowired
    public StudentController(MongoTemplate mongoTemplate, StudentRepositary studentRepositary) {
        this.mongoTemplate = mongoTemplate;
        this.studentRepositary = studentRepositary;
    }


    @GetMapping("/list")
    @CrossOrigin(origins = "*")
    public Page<StudentEntity> getAllStudent(@RequestParam int pageSize, @RequestParam int pageNumber) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return studentRepositary.findAll(pageable);
    }

    @GetMapping("/all")
    public List<StudentEntity> getStudentList(){
        return studentRepositary.findAll();
    }
    @PostMapping("/add")
    @CrossOrigin(origins = "*")
    public ResponseEntity<ApiResponse> createNewStudent(@RequestBody StudentDto studentDto) {
        StudentEntity student = new StudentEntity();
        if (!studentDto.isFull()) {
            return ResponseEntity.ok(IS_NOT_FULL);
        }
        student.setName(studentDto.getName());
        student.setFatherName(studentDto.getFatherName());
        student.setSurname(studentDto.getSurname());
        student.setAge(new Date(studentDto.getAge().getYear(), studentDto.getAge().getMonth(), studentDto.getAge().getDay()));
        switch (studentDto.getCourse()) {
            case 1:
                student.setCourse(CourseInterface.FIRST);
                break;
            case 2:
                student.setCourse(CourseInterface.SECOND);
                break;
            case 3:
                student.setCourse(CourseInterface.THIRD);
                break;
            case 4:
                student.setCourse(CourseInterface.FOURTH);
                break;
        }
        student.setRegion(studentDto.getRegion());
        StudentEntity save = studentRepositary.save(student);
        return ResponseEntity.ok(SUCCESS);

    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<ApiResponse> updateStudent(@PathVariable String id, @RequestBody StudentDto studentDto) {
        Optional<StudentEntity> optionalStudent = studentRepositary.findById(id);
        if (!optionalStudent.isPresent()) {
            return ResponseEntity.ok(STUDENT_NOT_FOUND);
        }
        StudentEntity student = optionalStudent.get();
        if (!studentDto.isFull()) {
            return ResponseEntity.ok(IS_NOT_FULL);
        }
        student.setCourse(studentDto.getCourse());
        student.setName(studentDto.getName());
        student.setAge(studentDto.getAge());
        student.setSurname(studentDto.getSurname());
        student.setFatherName(studentDto.getFatherName());
        student.setRegion(studentDto.getRegion());
        studentRepositary.save(student);
        return ResponseEntity.ok(SUCCESS);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse> deleteStudent(@PathVariable String id) {
        Optional<StudentEntity> byId = studentRepositary.findById(id);
        if (!byId.isPresent()) {
            return ResponseEntity.ok(STUDENT_NOT_FOUND);
        }
        StudentEntity student = byId.get();

        studentRepositary.delete(student);
        return ResponseEntity.ok(SUCCESS);
    }
    @GetMapping("/page")
    public Page<StudentEntity> searchTable(@RequestParam String search,@RequestParam int pageNumber,@RequestParam int pageSize){
        Pageable pageable= PageRequest.of(pageNumber,pageSize);
        Query query=new Query();
        Criteria criteria=new Criteria();
        try {
            int number=Integer.parseInt(search);
            criteria.orOperator(Criteria.where("name")
                    .regex(search),Criteria.where("surname")
                    .regex(search),Criteria.where("fatherName")
                    .regex(search),Criteria.where("region")
                    .regex(search),Criteria.where("course").is(number));
        }catch (Exception e){
            criteria.orOperator(Criteria.where("name")
                    .regex(search),Criteria.where("surname")
                    .regex(search),Criteria.where("fatherName")
                    .regex(search),Criteria.where("region")
                    .regex(search));
        }
        query.addCriteria(criteria).with(pageable).skip(pageable.getPageSize() * pageable.getPageNumber())
                .limit(pageable.getPageSize());;
        List<StudentEntity> objects = mongoTemplate.find(query, StudentEntity.class);
        long count = mongoTemplate.count(query.skip(-1).limit(-1),StudentEntity.class);
        Page<StudentEntity> page= new PageImpl<StudentEntity>(objects,pageable,count);
        return page;
    }
}
