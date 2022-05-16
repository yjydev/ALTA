package com.ssafy.alta.entity;

import javax.persistence.AttributeConverter;
import javax.persistence.Convert;
import javax.persistence.Converter;

/**
 * packageName 	: com.ssafy.alta.entity
 * fileName 	: AlertConverter
 * author 	    : 우정연
 * date		    : 2022-05-13
 * description	: Enum <-> DB 데이터 변환
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-05-13	    우정연  		    최초 생성
 */

@Converter
public class AlertConverter implements AttributeConverter<AlertType, Integer> {

    // AlertType을 DB 칼럼으로 변환
    @Override
    public Integer convertToDatabaseColumn(AlertType attribute) {
        return attribute.getCode();
    }

    // DB 칼럼을 AlertType로 변환
    @Override
    public AlertType convertToEntityAttribute(Integer dbData) {
        return AlertType.codeToAlertType(dbData);
    }
}
