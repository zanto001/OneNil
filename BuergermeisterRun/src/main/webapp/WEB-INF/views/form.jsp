<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Form page</title>
<link href="<c:url value='/static/css/style.css' />" rel="stylesheet"></link>
</head>
<body>
	<div>
		<h1>Spieldatenpflege</h1>
	</div>
	<div>
		<form:form method="POST" commandName="formModel" action="/BuergermeisterRun/submit" modelAttribute="formModel">
			<table>
				<tr>
					<td><form:label path="subject">Thema auswählen</form:label></td>
					<td><form:select path="subject">
						<form:option value="russische-kirche">Russische Kirche</form:option>
							<form:option value="neroberg">Neroberg</form:option>
							<form:option value="warmer-damm">Warmer Damm</form:option>
							<form:option value="kurhaus">Kurhaus</form:option>
						</form:select>
					</td>
				</tr>
				<tr>
					<td><form:label path="fact">Fakt eingeben</form:label></td>
					<td><form:input path="fact" /></td>
					<td><form:errors path="fact" class = "formValidationError" /></td>
				</tr>
				<tr>
					<td><form:label path="question">Frage eingeben</form:label></td>
					<td><form:input path="question" /></td>
					<td><form:errors path="question" class = "formValidationError" /></td>
				</tr>
				<tr>
					<td><form:label path="correctAnswer">Richtige Antwort</form:label></td>
					<td><form:input path="correctAnswer" /></td>
					<td><form:errors path="correctAnswer" class = "formValidationError" /></td>
				</tr>
				<tr>
					<td><form:label path="wrongAnswer1">Falsche Antwort 1</form:label></td>
					<td><form:input path="wrongAnswer1" /></td>
					<td><form:errors path="wrongAnswer1" class = "formValidationError" /></td>
				</tr>
				<tr>
					<td><form:label path="wrongAnswer2">Falsche Antwort 2</form:label></td>
					<td><form:input path="wrongAnswer2" /></td>
					<td><form:errors path="wrongAnswer2" class = "formValidationError" /></td>
				</tr>
				<tr>
					<td><form:label path="wrongAnswer3">Falsche Antwort 3</form:label></td>
					<td><form:input path="wrongAnswer3" /></td>
					<td><form:errors path="wrongAnswer3" class = "formValidationError" /></td>
				</tr>
				<tr>
					<td colspan="2"><input type="submit" value="Speichern" /></td>
				</tr>
			</table>
		</form:form>
	</div>
</body>
</html>