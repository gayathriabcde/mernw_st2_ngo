import { useState, useEffect } from "react";
import {Route} from "react-router-dom";
import Service from "../utils/http";
import {
  Container,
  Stack,
  Avatar,
  Text,
  Loader,
  Paper,
  Group,
  Badge,
  Button,
  Divider,
} from "@mantine/core";

import {
  IconShieldLock,
  IconMail,
  IconCalendar,
  IconUser,
} from "@tabler/icons-react";
import { AdminAccess } from "../components/AdminAccess";
import { redirect } from "react-router-dom";

export const Profile = () => {

  const [user, setUser] = useState(null);
const [showAdmin, setShowAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  async function fetchUser() {

    const service = new Service();

    try {

      const res = await service.get("user/me");

      setUser(res);

      console.log(res);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {

    fetchUser();

  }, []);

  // LOADING SCREEN
  if (loading) {

    return (

      <Stack
        h="100vh"
        align="center"
        justify="center"
      >

        <Loader
          color="green"
          type="dots"
          size="lg"
        />

      </Stack>
    );
  }

  // USER NOT FOUND
  if (!user) {

    return (

      <Text ta="center" mt="xl">
        User not found
      </Text>
    );
  }

  return (

    <Container size="sm" py="xl">

      <Paper
        shadow="md"
        radius="xl"
        p="xl"
        withBorder
      >

        <Stack gap="lg">

          {/* TOP SECTION */}
          <Group justify="center">

            <Stack align="center" gap="xs">

              <Avatar
                src={user.avatar}
                alt="profile"
                size={120}
                radius={120}
              />

              <Text
                fw={700}
                size="xl"
              >
                {user.name}
              </Text>

              <Badge
                color={
                  user.role === "admin"
                    ? "red"
                    : "green"
                }
                size="lg"
                variant="light"
              >
                {user.role}
              </Badge>

            </Stack>

          </Group>

          <Divider />

          {/* USER DETAILS */}
          <Stack gap="md">

            <Group>

              <IconMail size={20} />

              <Text>
                {user.email}
              </Text>

            </Group>

            <Group>

              <IconUser size={20} />

              <Text>
               { user.role === "admin" ? "Admin" : "NGO Field Worker"}
              </Text>

            </Group>

            <Group>

              <IconCalendar size={20} />

              <Text>
                Joined on{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </Text>

            </Group>

          </Stack>

          {user.role === "admin" && (

  <Button
    leftSection={<IconShieldLock size={18} />}
    color="red"
    radius="md"
    size="md"
    fullWidth
    onClick={() => setShowAdmin(!showAdmin)}
  >
    {showAdmin ? "Hide Admin Panel" : "Admin Access"}

  </Button>
)}
{showAdmin && <AdminAccess />}

        </Stack>

      </Paper>

    </Container>
  );
};