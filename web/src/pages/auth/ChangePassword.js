import React from "react";
import {Field, Form, Formik} from "formik";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import {TextField} from "formik-material-ui";
import LinearProgress from "@material-ui/core/LinearProgress";
import {makeStyles} from "@material-ui/core";
import {changePassword} from "../../api";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
    },
}));

export default function ChangePassword() {
    const classes = useStyles();

    const validate = (values) => {
        let errors = {};
        if (values.newPassword !== values.newPassword2) {
            errors.newPassword = "Passwords do not match";
        }
        return errors;
    }

    const handleSubmit = (values, {setSubmitting}) => {
        changePassword({
            oldPassword: values.password,
            newPassword: values.newPassword,
        })
            .then((res) => {
                setSubmitting(false);
                toast.success("Successfully changed password");
            })
            .catch((error) => {
                setSubmitting(false);
                toast.error(error);
            });
    };

    return (
        <Paper elevation={1} className={classes.paper}>
            <Typography component="h3" variant="h5">
                Change Password
            </Typography>
            <Formik validate={validate} initialValues={{password: "", newPassword: "", newPassword2: ""}}
                    onSubmit={handleSubmit}>
                {({handleSubmit, isSubmitting}) => (
                    <Form>
                        <Field
                            required
                            fullWidth
                            autoFocus
                            margin="normal"
                            type="password"
                            name="password"
                            component={TextField}
                            label="Password"
                        />

                        <Field
                            required
                            fullWidth
                            margin="normal"
                            type="password"
                            name="newPassword"
                            component={TextField}
                            label="New Password"
                        />

                        <Field
                            required
                            fullWidth
                            margin="normal"
                            type="password"
                            name="newPassword2"
                            component={TextField}
                            label="Repeat Password"
                        />

                        {isSubmitting && <LinearProgress/>}
                        <Button
                            type="submit"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={handleSubmit}
                        >
                            Save
                        </Button>
                    </Form>
                )}
            </Formik>
        </Paper>
    );
}

