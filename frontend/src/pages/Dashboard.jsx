import { useState, useEffect } from "react";
import { 
  Title, Text, Card, Group, Stack, SimpleGrid, Paper, 
  ThemeIcon, ActionIcon, Badge, Box, Tooltip, Loader, Center 
} from "@mantine/core";
import { 
  IconSparkles, IconFileCheck, IconClock, 
  IconLeaf, IconDotsVertical, IconCheck 
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { getName } from "../redux/slice/User";
import Service from "../utils/http";

export const Dashboard = () => {
  const userName = useSelector(getName) || "Admin";
  const service = new Service();

  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [activityRes, submissionRes] = await Promise.all([
          service.get("activity"),
          service.get("submission")
        ]);

        if (activityRes && activityRes.data) setActivities(activityRes.data);
        if (submissionRes && submissionRes.data) setSubmissions(submissionRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const now = new Date();
  
  const monthlyActivities = activities.filter(act => {
    const actDate = new Date(act.createdAt);
    return actDate.getMonth() === now.getMonth() && actDate.getFullYear() === now.getFullYear();
  }).length;

  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const weeklySubmissions = submissions.filter(sub => {
    return new Date(sub.createdAt) >= oneWeekAgo;
  }).length;

  const pendingReviews = activities.filter(act => act.status === "Pending").length;

  const generateChartData = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const chart = [];
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      chart.push({ 
        day: days[d.getDay()], 
        dateString: d.toDateString(),
        count: 0 
      });
    }

    activities.forEach(act => {
      const actDate = new Date(act.createdAt).toDateString();
      const chartItem = chart.find(item => item.dateString === actDate);
      if (chartItem) chartItem.count += 1;
    });

    return chart;
  };

  const chartData = generateChartData();
  const maxChartValue = Math.max(...chartData.map((d) => d.count), 1);

  const recentSubmissions = [...submissions]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  const generateAISummary = () => {
    if (activities.length === 0) return "No data available to generate insights yet. Add some activities to get started!";

    const typeCounts = activities.reduce((acc, act) => {
      const type = act.activityType || "General";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
    
    let topType = Object.keys(typeCounts)[0];
    let maxCount = 0;
    for (const type in typeCounts) {
      if (typeCounts[type] > maxCount) {
        maxCount = typeCounts[type];
        topType = type;
      }
    }

    let summary = `Overall fieldwork shows ${monthlyActivities} activities logged this month. `;
    if (topType) summary += `The ${topType} sector has been the most highly focused area. `;
    if (pendingReviews > 0) {
      summary += `Currently, there are ${pendingReviews} activities awaiting review or completion. `;
    } else {
      summary += `Great job, all activities are currently caught up with no pending reviews!`;
    }

    return summary;
  };
  
  if (loading) {
    return (
      <Center h="100vh">
        <Loader color="green" type="dots" />
      </Center>
    );
  }

  return (
    <Stack p="md" gap="xl">
      
      {/* head */}
      <div>
        <Title order={2} fw={800}>Welcome back, {userName}</Title>
        <Text c="dimmed">Here is what is happening with your NGO today.</Text>
      </div>

      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        <Paper withBorder p="md" radius="lg" shadow="sm">
          <Group justify="space-between">
            <Text size="sm" c="dimmed" fw={600}>ACTIVITIES THIS MONTH</Text>
            <ThemeIcon color="green" variant="light" size="lg" radius="md">
              <IconLeaf size={20} />
            </ThemeIcon>
          </Group>
          <Group align="flex-end" gap="sm" mt="md">
            <Text size="xl" fw={700}>{monthlyActivities}</Text>
          </Group>
        </Paper>

        <Paper withBorder p="md" radius="lg" shadow="sm">
          <Group justify="space-between">
            <Text size="sm" c="dimmed" fw={600}>WEEKLY SUBMISSIONS</Text>
            <ThemeIcon color="blue" variant="light" size="lg" radius="md">
              <IconFileCheck size={20} />
            </ThemeIcon>
          </Group>
          <Group align="flex-end" gap="sm" mt="md">
            <Text size="xl" fw={700}>{weeklySubmissions}</Text>
          </Group>
        </Paper>

        <Paper withBorder p="md" radius="lg" shadow="sm">
          <Group justify="space-between">
            <Text size="sm" c="dimmed" fw={600}>PENDING REVIEWS</Text>
            <ThemeIcon color={pendingReviews > 0 ? "orange" : "gray"} variant="light" size="lg" radius="md">
              <IconClock size={20} />
            </ThemeIcon>
          </Group>
          <Group align="flex-end" gap="sm" mt="md">
            <Text size="xl" fw={700}>{pendingReviews}</Text>
            {pendingReviews > 0 && <Text size="sm" c="dimmed" mb={4}>Require attention</Text>}
          </Group>
        </Paper>
      </SimpleGrid>
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
        
        <Stack gap="lg">
          
          <Paper p="lg" radius="lg" bg="green.0" style={{ border: '1px solid var(--mantine-color-green-2)' }}>
            <Group mb="sm">
              <ThemeIcon color="green" radius="xl" size="md">
                <IconSparkles size={14} />
              </ThemeIcon>
              <Text fw={700} c="green.9">Dynamic Insights</Text>
            </Group>
            <Text size="sm" c="green.9" lh={1.6}>
              {generateAISummary()}
            </Text>
          </Paper>

          <Paper withBorder p="lg" radius="lg" shadow="sm">
            <Group justify="space-between" mb="xl">
              <Text fw={700} size="lg">Activities Conducted</Text>
              <Badge color="gray" variant="light">Last 7 Days</Badge>
            </Group>
      
            <Group align="flex-end" justify="space-between" style={{ height: 200, width: '100%' }} wrap="nowrap" px="sm">
              {chartData.map((data, index) => {
                const heightPercentage = (data.count / maxChartValue) * 100;
                return (
                  <Stack key={index} align="center" gap="sm" style={{ width: '100%' }}>
                    <Tooltip label={`${data.count} activities`} withArrow position="top">
                      <Box 
                        bg={data.count > 0 ? "green" : "gray.3"} 
                        style={{ 
                          height: `${Math.max(heightPercentage, 2)}%`,
                          width: '100%', 
                          maxWidth: '40px',
                          borderRadius: '6px 6px 0 0',
                          transition: 'height 0.3s ease'
                        }} 
                      />
                    </Tooltip>
                    <Text size="xs" c="dimmed" fw={600}>{data.day}</Text>
                  </Stack>
                );
              })}
            </Group>
          </Paper>
        </Stack>

        <Paper withBorder p="lg" radius="lg" shadow="sm" h="100%">
          <Group justify="space-between" mb="lg">
            <Text fw={700} size="lg">Recent Submissions</Text>
          </Group>

          <Stack gap="md">
            {recentSubmissions.length === 0 ? (
              <Text size="sm" c="dimmed">No submissions found yet.</Text>
            ) : (
              recentSubmissions.map((sub) => (
                <Group key={sub._id} justify="space-between" align="flex-start" wrap="nowrap">
                  <Group wrap="nowrap">
                    <ThemeIcon 
                      color={sub.status === "Approved" ? "green" : "orange"} 
                      variant="light" 
                      size="lg" 
                      radius="md"
                    >
                      {sub.status === "Approved" ? <IconCheck size={18} /> : <IconClock size={18} />}
                    </ThemeIcon>
                    
                    <div>
                      <Text size="sm" fw={600} lineClamp={1}>
                        {sub.activityId?.title || "Submission Data"}
                      </Text>
                      <Text size="xs" c="dimmed">
                        By {sub.fieldWorkerId?.name || "Unknown Worker"}
                      </Text>
                    </div>
                  </Group>
                  
                  <Text size="xs" c="dimmed" style={{ whiteSpace: 'nowrap' }}>
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </Text>
                </Group>
              ))
            )}
          </Stack>
        </Paper>

      </SimpleGrid>
    </Stack>
  );
};