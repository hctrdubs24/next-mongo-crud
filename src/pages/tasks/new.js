import { useState, useEffect } from "react";
import { Button, Form, Grid } from "semantic-ui-react";
import { useRouter } from "next/router";
import Head from "next/head";
import { API_URI } from "pages/api/config";

export default function TaskFormPage() {
  const { query, push } = useRouter();

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const validate = () => {
    const errors = {};
    if (!newTask.title) errors.title = "Title is required";
    if (!newTask.description) errors.description = "Description is required";
    return errors;
  };

  const createTask = async () => {
    try {
      await fetch(API_URI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async () => {
    try {
      await fetch(API_URI + query.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let error = validate();
    if (Object.keys(error).length) return setErrors(errors);

    if (query.id) {
      await updateTask();
    } else {
      await createTask();
    }

    await push("/");
  };

  const handleChange = (e) =>
    setNewTask({ ...newTask, [e.target.name]: e.target.value });

  const getTask = async () => {
    const res = await fetch(`${API_URI}${query.id}`);
    const data = await res.json();
    setNewTask({
      title: data.title,
      description: data.description,
    });
  };
  useEffect(() => {
    if (query.id) {
      getTask();
    } else {
      setNewTask({
        title: "",
        description: "",
      });
    }
  }, [query.id]);

  return (
    <>
      <Head>
        <title>{query.id ? "Update Task" : "Create task"}</title>
      </Head>

      <Grid
        centered
        verticalAlign="middle"
        columns={"3"}
        style={{ height: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h2>{query.id ? "Update Task" : "Create Task"}</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Input
                label="Title"
                placeholder="Title"
                name="title"
                onChange={handleChange}
                error={
                  errors.title
                    ? { content: errors.title, pointing: "below" }
                    : null
                }
                value={newTask.title}
              />
              <Form.TextArea
                label="Description"
                placeholder="Description"
                name="description"
                onChange={handleChange}
                error={
                  errors.description
                    ? {
                        content: errors.description,
                        pointing: "below",
                      }
                    : null
                }
                value={newTask.description}
              />
              <Button color="teal">
                {query.id ? "Update Task" : "Save Task"}
              </Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}
