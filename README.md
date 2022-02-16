## create new user

### Endpoint :
localhost:3000/user 
### method : 
Post 
### body 
```json
{
    "name" : "name",
    "email" : "test@test.com",
    "password" : "123456"
}

```
## Create new project 
### endPoint 
localhost:3000/project
### method 
Post 
### body 
```json
{
    "name":"test",
    "description" : "test desc",
    "startDate" : "01/01/2022",
    "endDate": "02/02/2022",
    "status" : "active"
}
```

## Asign a Project to user 
### endPoint
localhost:3000/user/:id/:projectId
### Method
Post 
### body 
Empty 
### Paramas 
| Param     | Description |
| :---        |    :----:   |
| id      | User id       | 
| projectId   | Project id        | 