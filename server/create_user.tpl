<html>
    <head>
        <title>Create User</title>
    </head>
    <body>
        <form action="/service/v1/user/create" method="post">
            <p>Name: <input type="text" name="name"></p>
            <p>Email: <input type="text" name="email"></p>
            <input type="submit" value="Create">
        </form>
    </body>
</html>
