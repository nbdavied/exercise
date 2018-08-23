const _ = require('lodash');
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

var TODOS = [
    { 'id': 1, 'user_id': 1, 'name': "Get Milk", 'completed': false },
    { 'id': 2, 'user_id': 1, 'name': "Fetch Kids", 'completed': true },
    { 'id': 3, 'user_id': 2, 'name': "Buy flowers for wife", 'completed': false },
    { 'id': 4, 'user_id': 3, 'name': "Finish Angular JWT Todo App", 'completed': false },
];
var USERS = [
    { 'id': 1, 'username': 'jemma' },
    { 'id': 2, 'username': 'paul' },
    { 'id': 3, 'username': 'sebastian' },
];
var Questions = [
    {
        'id':1,'question':'test 1','choices':[
            {'id':0,text:'choice test 1'},
            { 'id': 1, text: 'choice test 2' },
            { 'id': 2, text: 'choice test 3' },
            { 'id': 3, text: 'choice test 4' }
        ],'type':'s'
    },
    {
        'id': 2, 'question': 'test 2', 'choices': [
            { 'id': 0, text: 'choice test 1' },
            { 'id': 1, text: 'choice test 2' },
            { 'id': 2, text: 'choice test 3' },
            { 'id': 3, text: 'choice test 4' }
        ], 'type': 'm'
    },
    {
        'id': 3, 'question': '单选 3', 'choices': [
            { 'id': 0, text: 'choice test 1' },
            { 'id': 1, text: 'choice test 2' }
        ], 'type': 't'
    },
    {
        'id': 4, 'question': 'test 4', 'choices': [
            { 'id': 0, text: 'choice test 1' },
            { 'id': 1, text: 'choice test 2' },
            { 'id': 2, text: 'choice test 3' },
            { 'id': 3, text: 'choice test 4' }
        ], 'type': 's'
    }
]
var index = 0;
function getQuestion(){
    return Questions[index++ %4];
}
function getTodos(userID) {
    var todos = _.filter(TODOS, ['user_id', userID]);

    return todos;
}
function getTodo(todoID) {
    var todo = _.find(TODOS, function (todo) { return todo.id == todoID; })

    return todo;
}
function getUsers() {
    return USERS;
}
app.use(bodyParser.json());
app.get('/api/question', function(req, res){
    res.send(getQuestion());
})
app.post('/api/auth', function (req, res) {
    const body = req.body;

    const user = USERS.find(user => user.username == body.username);
    if (!user || body.password != 'todo') return res.sendStatus(401);

    var token = jwt.sign({ userID: user.id }, 'todo-app-super-shared-secret', { expiresIn: '2h' });
    res.send({ token });
});
app.get('/', function (req, res) {
    res.send('Angular JWT Todo API Server')
});
app.get('/api/todos', function (req, res) {
    res.type("json");
    res.send(getTodos(1));
});
app.get('/api/todos/:id', function (req, res) {
    var todoID = req.params.id;
    res.type("json");
    res.send(getTodo(todoID));
});
app.get('/api/users', function (req, res) {
    res.type("json");
    res.send(getUsers());
});

app.listen(4000, function () {
    console.log('Angular JWT Todo API Server listening on port 4000!')
});
