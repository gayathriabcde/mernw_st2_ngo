import { useState, useEffect } from "react";

import {
  Group,
  Paper,
  Stack,
  Text,
  Select,
  Avatar,
  Badge,
  Button,
  Loader,
  Center,
} from "@mantine/core";

import {
  IconShieldLock,
  IconUser,
} from "@tabler/icons-react";

import Service from "../utils/http.js";

export const AdminAccess = () => {

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [roles, setRoles] = useState({});

  const service = new Service();

  const fetchUsers = async () => {

    try {

      const res = await service.get("user/all");

      setUsers(res.data);

      console.log("res", res);

    } catch (error) {

      console.error("Error fetching users:", error);

    } finally {

      setLoading(false);
    }
  };

  const updateRole = async (id) => {

    try {

      const role = roles[id];

      if (!role) return;

      const res = await service.patch(
        `user/all/${id}`,
        {
          role: role,
        }
      );

      console.log("updated", res);

      fetchUsers();

    } catch (error) {

      console.error(
        "Error updating user role:",
        error
      );
    }
  };

  useEffect(() => {

    fetchUsers();

  }, []);

  if (loading) {

    return (

      <Center mt="xl">

        <Loader
          color="red"
          type="dots"
        />

      </Center>
    );
  }

  return (

    <Stack gap="md" mt="lg">

      {users.map((item, index) => (

        <Paper
          key={index}
          p="lg"
          radius="xl"
          withBorder
          shadow="sm"
        >

          <Group
            justify="space-between"
            align="center"
          >

            {/* LEFT SIDE */}
            <Group>

              <Avatar
                src={item.avatar}
                size={60}
                radius={60}
              />

              <Stack gap={2}>

                <Text fw={700} size="lg">
                  {item.name}
                </Text>

                <Text
                  size="sm"
                  c="dimmed"
                >
                  {item.email}
                </Text>

                <Badge
                  color={
                    item.role === "admin"
                      ? "red"
                      : "green"
                  }
                  variant="light"
                  leftSection={
                    item.role === "admin"
                      ? <IconShieldLock size={12} />
                      : <IconUser size={12} />
                  }
                >
                  {item.role}
                </Badge>

              </Stack>

            </Group>

            {/* RIGHT SIDE */}
            <Stack w={220}>

              <Select
                label="Change Role"
                placeholder="Pick Role"
                value={roles[item._id] || item.role}
                data={[
                  {
                    value: "admin",
                    label: "Admin",
                  },

                  {
                    value: "field-worker",
                    label: "NGO Field Worker",
                  },
                ]}
                searchable
                onChange={(value) => {

                  setRoles({
                    ...roles,
                    [item._id]: value,
                  });

                }}
              />

              <Button
                color="red"
                radius="md"
                onClick={() => updateRole(item._id)}
              >
                Update Role
              </Button>

            </Stack>

          </Group>

        </Paper>

      ))}

    </Stack>
  );
};