const useStyles = theme => {
    console.log(theme);
    return ({
        root: {
            width: '90%',
            margin: "auto",
        },
        flex: {
            display: "flex",
            justifyContent: "space-evenly",
            margin: "20px 0",
        },
        card: {
            width: 345,
            height: 200,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontsize: "18px",
        },
        button: {
            marginRight: theme.spacing.unit,
        },
        instructions: {
            marginTop: theme.spacing.unit,
            marginBottom: theme.spacing.unit,
        },
        flexCentered: {
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
        },
        organizationCreate: {
            padding: "25px",
            margin: "30px auto",
            paddingBottom: "50px",
            textAlign: "center",
            width: "400px",
        },
        margin: {
            display: "inline",
            margin: theme.spacing.unit,
        },
        marginBottomXL: {
            margin: theme.spacing.unit * 4,
        },
        textTitle: {
            margin: theme.spacing.unit * 3,
        }
    })
};

export default useStyles;