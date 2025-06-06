
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Users, BookOpen, GraduationCap } from 'lucide-react';

const QuickActions = () => {
  const { data: stats } = useQuery({
    queryKey: ['admin_stats'],
    queryFn: async () => {
      // Get counts for institutions, teachers, students, and assignments
      const [institutionsResult, teachersResult, studentsResult, assignmentsResult] = await Promise.all([
        supabase.from('institutions').select('id', { count: 'exact', head: true }),
        supabase.from('teachers').select('id', { count: 'exact', head: true }),
        supabase.from('students').select('id', { count: 'exact', head: true }),
        supabase.from('assignments').select('id', { count: 'exact', head: true })
      ]);

      return {
        institutions: institutionsResult.count || 0,
        teachers: teachersResult.count || 0,
        students: studentsResult.count || 0,
        assignments: assignmentsResult.count || 0
      };
    }
  });

  const { data: recentActivity } = useQuery({
    queryKey: ['recent_activity'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('audit_logs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);
        
        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error('Error fetching recent activity:', error);
        return [];
      }
    }
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Quick Actions & Overview</h2>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Institutions</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.institutions || 0}</div>
            <p className="text-xs text-muted-foreground">Active institutions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teachers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.teachers || 0}</div>
            <p className="text-xs text-muted-foreground">Total teachers</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.students || 0}</div>
            <p className="text-xs text-muted-foreground">Total students</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.assignments || 0}</div>
            <p className="text-xs text-muted-foreground">Total assignments</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest system activities</CardDescription>
        </CardHeader>
        <CardContent>
          {recentActivity && recentActivity.length > 0 ? (
            <div className="space-y-3">
              {recentActivity.map((activity: any) => (
                <div key={activity.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.table_name && `Table: ${activity.table_name}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{activity.action}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(activity.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No recent activity</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActions;
