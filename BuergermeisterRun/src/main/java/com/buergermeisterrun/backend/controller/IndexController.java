package com.buergermeisterrun.backend.controller;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

import javax.validation.Valid;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.buergermeisterrun.backend.model.FormModel;

@Controller
@RequestMapping("/")
public class IndexController {
	
	@RequestMapping(method = RequestMethod.GET)
	public ModelAndView sayHello() {
		return new ModelAndView("form","formModel", new FormModel());
	}
	
	@RequestMapping(value = "/submit", method = RequestMethod.POST)
	public String submit(@Valid @ModelAttribute("formModel") FormModel formModel,
			BindingResult result, ModelMap model) {
		if(result.hasErrors()) {
			return "form";
		}
		writingJSON(formModel.toString());
		return "result";
	}
	
	
	/**
	 * Parse the submit.json file and return its content as string
	 * @return String
	 */
	@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
    @RequestMapping
    (value = "/json", method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String readingJSON() {
		
		// Get the content of the submit.json file
    	ClassLoader classLoader = getClass().getClassLoader();
		File file = new File(classLoader.getResource("json/submit.json").getFile());
		
		// Read each line of the file and append the data into a StringBuilder 
		StringBuilder result = new StringBuilder();
		try(Scanner scanner = new Scanner(file)){
			
			while (scanner.hasNextLine()) {
				String line = scanner.nextLine();
				result.append(line).append("\n");
			}
			
			scanner.close();
		}catch(IOException e) {
			e.printStackTrace();
		}
		
		return result.toString();
    }
	
	/**
	 * Writes the param given to the submit.json file
	 * @param writeThis String
	 */
    public void writingJSON(String writeThis) {
    	
    	FileWriter fw = null;
    	BufferedWriter bw = null;
    	
		try {

			ClassLoader classLoader = getClass().getClassLoader();
			File file = new File(classLoader.getResource("json/submit.json").getFile());
			
			StringBuilder result = new StringBuilder();
			
			try(Scanner scanner = new Scanner(file)){
				
				
				while (scanner.hasNextLine()) {
					String line = scanner.nextLine();

					if (line.contains("[")) {
						result.append(line).append(writeThis + "," + "\n");
					}else {
						result.append(line).append("\n");
					}
				}
				scanner.close();
			}catch(IOException e) {
				e.printStackTrace();
			}
			
			fw  = new FileWriter(file.getAbsoluteFile(),false);
			bw = new BufferedWriter(fw);
			bw.write(result.toString());
			
		}catch(IOException e) {
			e.printStackTrace();
		} finally {
			
			try {
				if (bw != null) {
					bw.close();
				}
				
				if (fw != null) {
					fw.close();
				}
			}catch (IOException ex) {
				ex.printStackTrace();
			}
			
		}
    }
}
