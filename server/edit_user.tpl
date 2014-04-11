<html>
    <head>
        <title>Edit User</title>
    </head>
    <body>
        <form action="/service/v1/user/edit/{{key}}" method="post">
            <p>Name: <input type="text" name="name", value={{name}}></p>
            <p>Email: <input type="text" name="email" value={{email}}></p>
            <input type="submit" value="Edit">
        </form>
    </body>
</html>
