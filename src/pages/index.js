import { useRouter } from "next/router";
import { Button, Card, Grid, Container } from "semantic-ui-react";
import { API_URI } from "pages/api/config.js";
import Head from "next/head";

export default function HomePage({ tasks }) {
  const router = useRouter();

  if (tasks.length === 0)
    return (
      <Grid
        centered
        verticalAlign="middle"
        columns="1"
        style={{ height: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h2>There are no tasks yet</h2>
            <img
              src="https://stories.freepiklabs.com/storage/18539/no-data-pana-1440.png"
              alt="No tasks yet"
            />
            <div>
              <Button color="teal">Create a Task</Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  //Render a list of tasks
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Container style={{ padding: "20px" }}>
        <Card.Group itemsPerRow={4}>
          {tasks.map((task) => (
            <Card key={task._id}>
              <Card.Content>
                <Card.Header>{task.title}</Card.Header>
                <p>{task.description}</p>
              </Card.Content>
              <Card.Content extra>
                <Button
                  primary
                  onClick={() => router.push(`/tasks/${task._id}`)}
                >
                  View
                </Button>
                <Button
                  secondary
                  onClick={() => router.push(`/tasks/${task._id}/edit`)}
                >
                  Edit
                </Button>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Container>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const res = await fetch(API_URI);
  console.log(API_URI);
  const tasks = await res.json();
  return {
    props: {
      tasks,
    },
  };
};
