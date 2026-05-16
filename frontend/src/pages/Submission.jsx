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
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";

import {
  IconLeaf,
  IconDroplet,
  IconEye,
  IconDotsVertical,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";

import Service from "../utils/http.js";

export const Submission = () => {

  const [submission, setSubmission] = useState([]);

  const [opened, { open, close }] = useDisclosure(false);

  const [updatedData, setUpdatedData] = useState({});

  const [id, setId] = useState("");

  const service = new Service();

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

  return (

    <Stack gap="md">

      {submission.map((item, index) => (

        <Paper
          key={index}
          p="md"
          radius="lg"
          withBorder
        >

          <Group justify="space-between" align="center">

            {/* LEFT SECTION */}
            <Group>

              <ThemeIcon
                size={52}
                radius="md"
                color="green"
                variant="light"
              >

                {item.activityId?.activityType === "Water" ? (

                  <IconDroplet size={24} />

                ) : (

                  <IconLeaf size={24} />

                )}

              </ThemeIcon>

              <Stack gap={2}>

                <Text fw={700} size="lg">
                  {item.activityId?.title}
                </Text>

                <Text size="sm" c="dimmed">
                  Submitted by: {item.fieldWorkerId?.name}
                </Text>

                <Text size="sm">
                  {item.data}
                </Text>

              </Stack>

            </Group>

            {/* RIGHT SECTION */}
            <Group gap="xl">

              <Stack gap={2} align="flex-start">

                <Text size="xs" fw={700} c="dimmed">
                  DATE
                </Text>

                <Text>
                  {new Date(item.createdAt).toLocaleDateString()}
                </Text>

              </Stack>

              <Stack gap={2} align="flex-start">

                <Text size="xs" fw={700} c="dimmed">
                  TYPE
                </Text>

                <Badge
                  color="green"
                  variant="light"
                  radius="xl"
                >
                  {item.activityId?.activityType}
                </Badge>

              </Stack>

              {/* MENU */}
              <Menu shadow="md" width={160}>

                <Menu.Target>

                  <ActionIcon
                    variant="subtle"
                    color="gray"
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

          </Group>

        </Paper>

      ))}

      {/* UPDATE MODAL */}
      <Modal
        opened={opened}
        onClose={close}
        title="Edit Submission"
      >

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
          mt="md"
          onClick={updateRecord}
        >
          Update
        </Button>

      </Modal>

    </Stack>
  );
};