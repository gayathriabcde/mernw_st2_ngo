import { useState } from "react";
import Service from "../utils/http";
import {
  Title,
  Text,
  Button,
  Card,
  Group,
  Table,
  Badge,
  TextInput,
  Select,
  Stack,
  SimpleGrid,
} from "@mantine/core";

import { IconPlus, IconSearch } from "@tabler/icons-react";
export const Activity = () => {
    const[activities, setActivities] = useState([]);
    const[search, setSearch] = useState("");
    const service = new Service();
    const fetchActivities= async()=>{
        try{
            const res = await service.get("activity");
            setActivities(res);
        } catch (error) {
            console.error("Error fetching activities:", error);
        }
    };

    useState(() => {
        fetchActivities();
    }, []);

  return (
    <Stack p="md">

      {/* HEADER */}
      <div>
        <Title order={1}>
          Activities Management
        </Title>

        <Text color="dimmed">
          Monitor and coordinate environmental fieldwork efforts.
        </Text>
      </div>

      {/* ADD BUTTON */}
      <Button
        leftSection={<IconPlus size={18} />}
        color="green"
        radius="md"
        size="md"
      >
        Add Activity
      </Button>

      {/* FILTER CARD */}
      <Card shadow="sm" radius="lg" padding="lg">

        <Stack>

          <TextInput
            placeholder="Search activities..."
            leftSection={<IconSearch size={18} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select
            placeholder="All Activity Types"
            data={[
              "Reforestation",
              "Wildlife",
              "Water Testing",
              "Soil Analysis",
            ]}
          />

        </Stack>
      </Card>

      {/* TABLE */}
      <Card shadow="sm" radius="lg" padding="lg">

        <Table striped highlightOnHover>

          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Location</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>

            {filteredActivities.map((activity) => (

              <Table.Tr key={activity._id}>

                <Table.Td>
                  <Text fw={600}>
                    {activity.title}
                  </Text>

                  <Text size="sm" c="dimmed">
                    {activity.description}
                  </Text>
                </Table.Td>

                <Table.Td>
                  <Badge color="green">
                    {activity.type}
                  </Badge>
                </Table.Td>

                <Table.Td>
                  {activity.location}
                </Table.Td>

              </Table.Tr>

            ))}

          </Table.Tbody>

        </Table>

      </Card>

      {/* STATS */}
      <SimpleGrid cols={3}>

        <Card radius="lg" shadow="sm">
          <Text size="sm" c="dimmed">
            ACTIVE MISSIONS
          </Text>

          <Title order={2}>
            248
          </Title>
        </Card>

        <Card radius="lg" shadow="sm">
          <Text size="sm" c="dimmed">
            TOTAL BENEFICIARIES
          </Text>

          <Title order={2}>
            14,205
          </Title>
        </Card>

        <Card radius="lg" shadow="sm">
          <Text size="sm" c="dimmed">
            ACTIVE REGIONS
          </Text>

          <Title order={2}>
            18 Countries
          </Title>
        </Card>

      </SimpleGrid>

    </Stack>
  );
}

