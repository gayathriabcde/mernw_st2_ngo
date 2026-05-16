import { Group, Button, Text, ThemeIcon, Menu, Avatar, UnstyledButton, Container, Paper } from "@mantine/core";
import { IconLeaf, IconLogout, IconLayoutDashboard, IconChevronDown, IconActivity, IconFileCheck, IconUser } from "@tabler/icons-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getName, getRole, removeUser } from "../redux/slice/User";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const userName = useSelector(getName) || "User";
  const userRole = useSelector(getRole);

  const navLinks = [
    { label: "Activities", path: "/activity", icon: IconActivity },
    { label: "Submissions", path: "/submission", icon: IconFileCheck },
    { label: "Profile", path: "/profile", icon: IconUser },
  ];

  const handleLogout = () => {
    dispatch(removeUser());
    
    navigate("/");
  };

  return (
    <Paper shadow="xs" radius={0} style={{ borderBottom: "1px solid var(--mantine-color-gray-2)" }}>
      <Container size="xl" h={70}>
        <Group justify="space-between" h="100%">
          
          <Group style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            <ThemeIcon color="green" size="lg" radius="md" variant="light">
              <IconLeaf size={22} />
            </ThemeIcon>
            <Text size="xl" fw={800} c="green.9" style={{ letterSpacing: "-0.5px" }}>
              FieldSync
            </Text>
          </Group>
          
          <Group gap="xs" visibleFrom="sm">
            {navLinks.map((link) => {
              const isActive = location.pathname.includes(link.path);
              const Icon = link.icon;
              return (
                <Button
                  key={link.path}
                  variant={isActive ? "light" : "subtle"}
                  color={isActive ? "green" : "gray"}
                  onClick={() => navigate(link.path)}
                  leftSection={<Icon size={18} />}
                  radius="md"
                >
                  {link.label}
                </Button>
              );
            })}
          </Group>

          <Group>
            <Menu shadow="md" width={200} position="bottom-end" radius="md">
              <Menu.Target>
                <UnstyledButton style={{ padding: "8px 12px", borderRadius: "8px", transition: "background-color 0.2s" }} className="hover-bg-gray">
                  <Group gap={10}>
                    <Avatar color="green" radius="xl" size="sm">
                      {userName.charAt(0).toUpperCase()}
                    </Avatar>
                    <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
                      <Text size="sm" fw={600}>
                        {userName}
                      </Text>
                      <Text size="xs" c="dimmed" style={{ textTransform: "capitalize" }}>
                        {userRole || "Field Worker"}
                      </Text>
                    </div>
                    <IconChevronDown size={14} style={{ color: "var(--mantine-color-gray-6)" }} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>                
                <Menu.Item 
                  color="red" 
                  leftSection={<IconLogout size={14} />}
                  onClick={handleLogout}
                >
                  Log out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>

        </Group>
      </Container>
    </Paper>
  );
};