import { use, useEffect, useState } from "react";
import {
  Paper,
  Group,
  Stack,
  Text,
  Badge,
  ThemeIcon,
  ActionIcon,
} from "@mantine/core";

import {
  IconLeaf,
  IconDroplet,
  IconEye,
  IconDotsVertical,
} from "@tabler/icons-react";

import Service from "../utils/http.js";

export const Submission = () => {
  const [submission, setSubmission] = useState([]);
    const service = new Service();
  const fetchSubmission = async () => {
    try {
      const res = await service.get("submission");
    //   console.log(res.data);
      setSubmission(res.data);
    } catch (error) {
      console.error("Error fetching submission:", error);
    }
  };

  useEffect(() => {
    fetchSubmission();
  }, []);

  useEffect(() => {
    console.log(submission);
  }, [submission]);

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

      {/* LEFT */}
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

      {/* RIGHT */}
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

        <Group gap="xs">

          <ActionIcon variant="subtle" color="gray">
            <IconEye size={18} />
          </ActionIcon>

          <ActionIcon variant="subtle" color="gray">
            <IconDotsVertical size={18} />
          </ActionIcon>

        </Group>

      </Group>

    </Group>

  </Paper>

))}
    </Stack>
  );
};