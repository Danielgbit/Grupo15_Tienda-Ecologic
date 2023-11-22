const UserDestroy = ({user}) => {

    return(
        <form action={`/user/${user && user.user_id}/delete?_method=DELETE`} method="post">
            <button className="button-delete-user buttons-user" type="submit">
                <i className="fa-solid fa-user-xmark"></i>Eliminar cuenta
            </button>
        </form>
    )

};

export default UserDestroy;