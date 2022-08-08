import Error from "next/error";
import { useState } from "react";
import { Button, Grid, Confirm, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import Head from "next/head";
import { API_URI } from "pages/api/config";

export default function TaskDetail({ task, error }) {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { query, push } = useRouter();

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const deleteTask = async () => {
    const { id } = query;
    try {
      await fetch(`${API_URI}${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = () => {
    setIsDeleting(true);
    deleteTask();
    close();
    push("/");
  };

  if (error && error.statusCode)
    return <Error statusCode={error.statusCode} title={error.statusText} />;

  return (
    <>
      <Head>
        <title>Task details</title>
      </Head>
      <Grid
        centered
        verticalAlign="middle"
        columns={"1"}
        style={{ height: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <div>
              <Button color="red" onClick={open} loading={isDeleting}>
                Delete
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Confirm
          header="Please confirm"
          content="Are you sure you want to delete this task?"
          open={confirm}
          onConfirm={handleDelete}
          onCancel={close}
        />
      </Grid>
    </>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`${API_URI}${id}`);
  if (res.status === 200) {
    const task = await res.json();
    return {
      props: { task },
    };
  }

  return {
    props: { error: { statusCode: res.status, statusText: res.statusText } },
  };
}
