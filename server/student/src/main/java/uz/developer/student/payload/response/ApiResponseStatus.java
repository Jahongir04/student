package uz.developer.student.payload.response;

import uz.developer.student.payload.response.ApiResponse;

public interface ApiResponseStatus {
    ApiResponse SUCCESS=new ApiResponse("operation is success",true,0);
    ApiResponse STUDENT_NOT_FOUND=new ApiResponse("student not found",false,-100);
    ApiResponse STUDENT_NOT_CREATE=new ApiResponse("student not create",true,-101);
    ApiResponse IS_NOT_FULL=new ApiResponse("variable is not full",false,-102);
}
