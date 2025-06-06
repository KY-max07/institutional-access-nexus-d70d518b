
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, GraduationCap, BookOpen, ClipboardList, TrendingUp, AlertTriangle } from 'lucide-react';

const QuickActions = () => {
  const { data: stats } = useQuery({
    queryKey: ['dashboard_stats'],
    queryFn: async () => {
      try {
        const [
          institutionsResult,
          teachersResult,
          studentsResult,
          classesResult,
          assignmentsResult
        ] = await Promise.all([
          supabase.from('institutions').select('id', { count: 'exact' }),
          supabase.from('teachers' as any).select('id', { count: 'exact' }),
          supabase.from('students' as any).select('id', { count: 'exact' }),
          supabase.from('classes' as any).select('id', { count: 'exact' }),
          supabase.from('assignments' as any).select('id', { count: 'exact' })
        ]);

        return {
          institutions: institutionsResult.count || 0,
          teachers: teachersResult.count || 0,
          students: studentsResult.count || 0,
          classes: classesResult.count || 0,
          assignments: assignmentsResult.count || 0
        };
      } catch (error) {
        console.error('Error fetching stats:', error);
        return {
          institutions: 0,
          teachers: 0,
          students: 0,
          classes: 0,
          assignments: 0
        };
      }
    },
    refetchInterval: 30000 // Refresh every 30 seconds
  });

  const { data: recentActivity } = useQuery({
    queryKey: ['recent_activity'],
    queryFn: async () => {
      try {
        const { data: recentProfiles } = await supabase
          .from('profiles')
          .select('name, role, created_at')
          .order('created_at', { ascending: false })
          .limit(5);

        const { data: recentAssignments } = await supabase
          .from('assignments' as any)
          .select(`
            title,
            created_at,
            teachers(name)
          `)
          .order('created_at', { ascending: false })
          .limit(3);

        return {
          newUsers: recentProfiles || [],
          newAssignments: recentAssignments || []
        };
      } catch (error) {
        console.error('Error fetching recent activity:', error);
        return {
          newUsers: [],
          newAssignments: []
        };
      }
    }
  });

  const quickActionCards = [
    {
      title: "System Overview",
      description: "Current system statistics",
      icon: TrendingUp,
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats?.institutions}</div>
            <div className="text-sm text-gray-600">Institutions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats?.teachers}</div>
            <div className="text-sm text-gray-600">Teachers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{stats?.students}</div>
            <div className="text-sm text-gray-600">Students</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{stats?.classes}</div>
            <div className="text-sm text-gray-600">Classes</div>
          </div>
        </div>
      )
    },
    {
      title: "Recent Users",
      description: "Latest registered users",
      icon: Users,
      content: (
        <div className="space-y-2">
          {recentActivity?.newUsers.slice(0, 3).map((user, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span className="font-medium">{user.name}</span>
              <span className="text-gray-500 capitalize">{user.role.replace('_', ' ')}</span>
            </div>
          ))}
          {(!recentActivity?.newUsers || recentActivity.newUsers.length === 0) && (
            <p className="text-sm text-gray-500">No recent users</p>
          )}
        </div>
      )
    },
    {
      title: "Recent Assignments",
      description: "Latest created assignments",
      icon: ClipboardList,
      content: (
        <div className="space-y-2">
          {recentActivity?.newAssignments.map((assignment, index) => (
            <div key={index} className="text-sm">
              <div className="font-medium">{assignment.title}</div>
              <div className="text-gray-500">
                by {(assignment as any).teachers?.name || 'Unknown'}
              </div>
            </div>
          ))}
          {(!recentActivity?.newAssignments || recentActivity.newAssignments.length === 0) && (
            <p className="text-sm text-gray-500">No recent assignments</p>
          )}
        </div>
      )
    },
    {
      title: "Quick Actions",
      description: "Common management tasks",
      icon: AlertTriangle,
      content: (
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            Manage Users
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <GraduationCap className="mr-2 h-4 w-4" />
            View Reports
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <BookOpen className="mr-2 h-4 w-4" />
            System Settings
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Quick Actions & Overview</h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {quickActionCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  {card.title}
                </CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {card.content}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
