My submission for the MK Developer Challange. It's a simple contact form that sends an email to the email address that is input. Being that it's using a sandboxed AWS account, it can only send emails to verified email addresses.

The project is using AWS API Gateway for the 'API' and using AWS Lambdas for email sending / database logic.

The lambda will write a email record to a AWS DynamoDB table recording the email address, name, and message.