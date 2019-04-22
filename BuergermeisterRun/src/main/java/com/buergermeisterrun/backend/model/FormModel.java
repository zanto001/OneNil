package com.buergermeisterrun.backend.model;

import java.io.Serializable;
import org.hibernate.validator.constraints.NotEmpty;
import com.fasterxml.jackson.core.JsonProcessingException;

/**
 * Bean Model 
 * Properties represent the fields declared in the formpage
 */
public class FormModel implements Serializable {
	
	
	private static final long serialVersionUID = 1L;

	private String subject;
	
	
	@NotEmpty(message = "Bitte ein Fakt einpflegen")
	private String fact;
	
	//@NotNull(message = "Bitte")
	@NotEmpty(message = "Bitte eine Frage einpflegen")
	private String question;
	
	//@NotNull(message = "Bitte")
	@NotEmpty(message = "Bitte eine Antwort einpflegen")
	private String correctAnswer;
	
	//@NotNull(message = "Bitte")
	@NotEmpty(message = "Bitte eine Antwort einpflegen")
	private String wrongAnswer1;
	
	//@NotNull(message = "Bitte")
	@NotEmpty(message = "Bitte eine Antwort einpflegen")
	private String wrongAnswer2;
	
	//@NotNull(message = "Bitte")
	@NotEmpty(message = "Bitte eine Antwort einpflegen")
	private String wrongAnswer3;
	
		
	public String getSubject() {
		return subject;
	}


	public void setSubject(String subject) {
		this.subject = subject;
	}


	public String getFact() {
		return fact;
	}


	public void setFact(String fact) {
		this.fact = fact;
	}


	public String getQuestion() {
		return question;
	}


	public void setQuestion(String question) {
		this.question = question;
	}


	public String getCorrectAnswer() {
		return correctAnswer;
	}


	public void setCorrectAnswer(String correctAnswer) {
		this.correctAnswer = correctAnswer;
	}


	public String getWrongAnswer1() {
		return wrongAnswer1;
	}


	public void setWrongAnswer1(String wrongAnswer1) {
		this.wrongAnswer1 = wrongAnswer1;
	}


	public String getWrongAnswer2() {
		return wrongAnswer2;
	}


	public void setWrongAnswer2(String wrongAnswer2) {
		this.wrongAnswer2 = wrongAnswer2;
	}


	public String getWrongAnswer3() {
		return wrongAnswer3;
	}


	public void setWrongAnswer3(String wrongAnswer3) {
		this.wrongAnswer3 = wrongAnswer3;
	}


	/**
	 * Returns a String in JSON format
	 * Manual adjustments were still required
	 */
	public String toString() {
		try {
			return "\n" + new com.fasterxml.jackson.databind.ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(this);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return "Please check the JSON Data"; 
	}
	
	
	
	
	
	
	

}