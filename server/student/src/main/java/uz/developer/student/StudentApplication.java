package uz.developer.student;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import uz.developer.student.entity.StudentEntity;
import uz.developer.student.enums.CourseEnum;
import uz.developer.student.payload.CourseInterface;
import uz.developer.student.repository.StudentRepositary;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@SpringBootApplication
public class StudentApplication {

    private final StudentRepositary studentRepositary;

    @Autowired
    public StudentApplication(StudentRepositary studentRepositary) {
        this.studentRepositary = studentRepositary;
    }

    public static void main(String[] args) {
        SpringApplication.run(StudentApplication.class, args);
//
//        ConnectionString connectionString = new ConnectionString("mongodb+srv://Mongo:mongo@cluster.coxru.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
//        MongoClientSettings settings = MongoClientSettings.builder()
//                .applyConnectionString(connectionString)
//                .build();
//        MongoClient mongoClient = MongoClients.create(settings);
//        MongoDatabase database = mongoClient.getDatabase("test");
    }
}
