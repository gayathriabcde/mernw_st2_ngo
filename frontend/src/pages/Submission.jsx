import { useEffect, useState } from "react";

import {
  Paper,
  Group,
  Stack,
  Text,
  Badge,
  ThemeIcon,
  ActionIcon,
  Modal,
  Button,
  TextInput,
  Menu,
  Select,
  Container,
  Card,
  Divider,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";

import {
  IconLeaf,
  IconDroplet,
  IconEye,
  IconDotsVertical,
  IconEdit,
  IconTrash,
  IconPlus,
} from "@tabler/icons-react";

import Service from "../utils/http.js";

export const Submission = () => {

  const [submission, setSubmission] = useState([]);

  const [activity, setActivity] = useState([]);

  const [opened, { open, close }] = useDisclosure(false);

  const [
    addOpened,
    { open: openAdd, close: closeAdd }
  ] = useDisclosure(false);

  const [updatedData, setUpdatedData] = useState({});

  const [data, setData] = useState({
    data: "",
  });

  const [id, setId] = useState("");

  const service = new Service();

  const fetchActivity = async () => {

    try {

      const res = await service.get("activity");

      console.log(res.data);

      setActivity(res.data);

    } catch (error) {

      console.error("Error fetching activity:", error);
    }
  };

  useEffect(() => {

    fetchActivity();

  }, []);

  useEffect(() => {

    console.log("activity :", activity);

  }, [activity]);

  // FETCH SUBMISSIONS
  const fetchSubmission = async () => {

    try {

      const res = await service.get("submission");

      setSubmission(res.data);

    } catch (error) {

      console.error("Error fetching submission:", error);
    }
  };

  // FETCH ON PAGE LOAD
  useEffect(() => {

    fetchSubmission();

  }, []);

  // UPDATE HANDLER
  const handleUpdate = (element) => {

    setId(element._id);

    setUpdatedData({
      data: element.data,
    });

    open();
  };

  // UPDATE API CALL
  const updateRecord = async () => {

    try {

      const res = await service.patch(
        `submission/${id}`,
        updatedData
      );

      console.log(res);

      close();

      fetchSubmission();

    } catch (error) {

      console.error(error.message);
    }
  };

  // DELETE API CALL
  const handleDelete = async (id) => {

    try {

      await service.delete(`submission/${id}`);

      fetchSubmission();

    } catch (error) {

      console.log(error);
    }
  };

  // ADD SUBMISSION
  const addSubmission = async () => {

    try {

      await service.post("submission", data);

      closeAdd();

      fetchSubmission();

      setData({
        data: "",
      });

    } catch (error) {

      console.error("Error adding submission:", error);
    }
  };

  return (

    <Container size="lg" py="xl">

      <Stack gap="lg">

        {/* TOP BAR */}
        <Group justify="space-between">

          <Stack gap={0}>

            <Text fw={700} size="xl">
              Submissions
            </Text>

            <Text c="dimmed" size="sm">
              Manage all NGO field submissions
            </Text>

          </Stack>

          <Button
            onClick={openAdd}
            leftSection={<IconPlus size={18} />}
            color="green"
            radius="md"
            size="md"
          >
            Add Submission
          </Button>

        </Group>

        <Divider />

        {/* SUBMISSION CARDS */}
        {submission.map((item, index) => (

          <Card
            key={index}
            shadow="sm"
            radius="xl"
            padding="lg"
            withBorder
          >

            <Group
              justify="space-between"
              align="flex-start"
            >

              {/* LEFT SECTION */}
              <Group align="flex-start">

                <ThemeIcon
                  size={60}
                  radius="xl"
                  color="green"
                  variant="light"
                >

                  {item.activityId?.activityType === "Water" ? (

                    <IconDroplet size={28} />

                  ) : (

                    <IconLeaf size={28} />

                  )}

                </ThemeIcon>

                <Stack gap={4}>

                  <Text fw={700} size="lg">
                    {item.activityId?.title}
                  </Text>

                  <Text size="sm" c="dimmed">
                    Submitted by{" "}
                    {item.fieldWorkerId?.name}
                  </Text>

                  <Text size="sm">
                    {item.data}
                  </Text>

                  <Group mt="xs">

                    <Badge
                      color="green"
                      variant="light"
                      radius="xl"
                    >
                      {item.activityId?.activityType}
                    </Badge>

                    <Badge
                      color="blue"
                      variant="light"
                      radius="xl"
                    >
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}
                    </Badge>

                  </Group>

                </Stack>

              </Group>

              {/* RIGHT SECTION */}
              <Menu shadow="md" width={170}>

                <Menu.Target>

                  <ActionIcon
                    variant="subtle"
                    color="gray"
                    size="lg"
                  >
                    <IconDotsVertical size={18} />
                  </ActionIcon>

                </Menu.Target>

                <Menu.Dropdown>

                  <Menu.Item
                    leftSection={<IconEye size={16} />}
                  >
                    View
                  </Menu.Item>

                  <Menu.Item
                    leftSection={<IconEdit size={16} />}
                    onClick={() => handleUpdate(item)}
                  >
                    Update
                  </Menu.Item>

                  <Menu.Item
                    color="red"
                    leftSection={<IconTrash size={16} />}
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Menu.Item>

                </Menu.Dropdown>

              </Menu>

            </Group>

          </Card>

        ))}

      </Stack>

      {/* UPDATE MODAL */}
      <Modal
        opened={opened}
        onClose={close}
        title="Edit Submission"
        centered
        radius="lg"
      >

        <Stack>

          <TextInput
            value={updatedData.data || ""}
            label="Enter new data"
            onChange={(e) => {

              setUpdatedData({
                ...updatedData,
                data: e.target.value,
              });

            }}
            placeholder="Enter updated submission"
          />

          <Button
            mt="sm"
            onClick={updateRecord}
            color="green"
            radius="md"
          >
            Update
          </Button>

        </Stack>

      </Modal>

      {/* ADD MODAL */}
      <Modal
        opened={addOpened}
        onClose={closeAdd}
        title="Add Submission"
        centered
        radius="lg"
      >

        <Stack>

          <Select
            label="Your Activity"
            placeholder="Pick Activity"
            searchable
            nothingFoundMessage="No activities found"
            data={activity.map((act) => ({
              value: act._id,
              label: act.title,
            }))}
            onChange={(value) =>
              setData({
                ...data,
                activityId: value,
              })
            }
          />

          <TextInput
            label="Enter submission data"
            value={data.data}
            onChange={(e) => {

              setData({
                ...data,
                data: e.target.value,
              });

            }}
            placeholder="Enter new submission"
          />

          <Button
            mt="sm"
            onClick={addSubmission}
            color="green"
            radius="md"
          >
            Add Submission
          </Button>

        </Stack>

      </Modal>

    </Container>
  );
};