
import React from 'react';
import Layout from '../Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Users, BookOpen, CheckCircle, Clock, MessageSquare, FileText } from 'lucide-react';

const TeacherDashboard = () => {
  const stats = [
    { title: 'My Classes', value: '5', icon: BookOpen, color: 'text-blue-600' },
    { title: 'Total Students', value: '127', icon: Users, color: 'text-green-600' },
    { title: 'Assignments Due', value: '8', icon: FileText, color: 'text-orange-600' },
    { title: 'Attendance Today', value: '95%', icon: CheckCircle, color: 'text-purple-600' }
  ];

  const myClasses = [
    { id: 1, name: 'Advanced Mathematics', grade: '10th', students: 28, schedule: 'Mon/Wed/Fri 9:00 AM', room: 'A-101' },
    { id: 2, name: 'Algebra II', grade: '11th', students: 32, schedule: 'Tue/Thu 10:00 AM', room: 'A-102' },
    { id: 3, name: 'Geometry', grade: '9th', students: 24, schedule: 'Mon/Wed/Fri 2:00 PM', room: 'A-103' },
    { id: 4, name: 'Statistics', grade: '12th', students: 30, schedule: 'Tue/Thu 1:00 PM', room: 'A-104' },
    { id: 5, name: 'Pre-Calculus', grade: '11th', students: 26, schedule: 'Daily 11:00 AM', room: 'A-105' }
  ];

  const todaySchedule = [
    { time: '9:00 AM', class: 'Advanced Mathematics', room: 'A-101', status: 'completed' },
    { time: '11:00 AM', class: 'Pre-Calculus', room: 'A-105', status: 'current' },
    { time: '2:00 PM', class: 'Geometry', room: 'A-103', status: 'upcoming' },
    { time: '3:30 PM', class: 'Faculty Meeting', room: 'Conference Room', status: 'upcoming' }
  ];

  const recentStudents = [
    { name: 'Alex Rodriguez', class: 'Advanced Math', lastGrade: 'A-', attendance: 95 },
    { name: 'Emma Watson', class: 'Pre-Calculus', lastGrade: 'B+', attendance: 92 },
    { name: 'David Kim', class: 'Geometry', lastGrade: 'A', attendance: 88 },
    { name: 'Sofia Martinez', class: 'Statistics', lastGrade: 'A-', attendance: 97 }
  ];

  const assignments = [
    { title: 'Quadratic Equations Quiz', class: 'Advanced Math', dueDate: 'Today', submitted: 22, total: 28 },
    { title: 'Geometric Proofs Assignment', class: 'Geometry', dueDate: 'Tomorrow', submitted: 18, total: 24 },
    { title: 'Statistics Project', class: 'Statistics', dueDate: 'Friday', submitted: 25, total: 30 },
    { title: 'Algebra Problem Set', class: 'Algebra II', dueDate: 'Monday', submitted: 30, total: 32 }
  ];

  const messages = [
    { from: 'Maria Rodriguez (Admin)', subject: 'New grading guidelines', time: '2 hours ago', unread: true },
    { from: 'Parent - John Smith', subject: 'Question about Alex\'s progress', time: '5 hours ago', unread: true },
    { from: 'System', subject: 'Weekly attendance report ready', time: '1 day ago', unread: false },
    { from: 'David Chen (Management)', subject: 'Faculty meeting agenda', time: '2 days ago', unread: false }
  ];

  return (
    <Layout title="Teacher Dashboard">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Classes and Students */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="classes" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="classes">My Classes</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
              </TabsList>

              <TabsContent value="classes" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>My Classes</CardTitle>
                    <CardDescription>Classes you're currently teaching</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {myClasses.map((classItem) => (
                        <div key={classItem.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{classItem.name}</h3>
                            <Badge variant="outline">{classItem.grade}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <p>👥 {classItem.students} students</p>
                            <p>📍 Room {classItem.room}</p>
                            <p className="col-span-2">🕒 {classItem.schedule}</p>
                          </div>
                          <div className="mt-3 flex space-x-2">
                            <Button size="sm" variant="outline">View Details</Button>
                            <Button size="sm" variant="outline">Take Attendance</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="students" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Student Activity</CardTitle>
                    <CardDescription>Students who need attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentStudents.map((student, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h3 className="font-semibold">{student.name}</h3>
                            <p className="text-sm text-gray-600">{student.class}</p>
                            <p className="text-sm text-gray-600">Last Grade: {student.lastGrade}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">Attendance</p>
                            <div className="flex items-center space-x-2">
                              <Progress value={student.attendance} className="w-16" />
                              <span className="text-sm">{student.attendance}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="assignments" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Assignment Status</CardTitle>
                    <CardDescription>Track assignment submissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {assignments.map((assignment, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{assignment.title}</h3>
                            <Badge variant={assignment.dueDate === 'Today' ? 'destructive' : 'secondary'}>
                              Due {assignment.dueDate}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{assignment.class}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Progress 
                                value={(assignment.submitted / assignment.total) * 100} 
                                className="w-32" 
                              />
                              <span className="text-sm">
                                {assignment.submitted}/{assignment.total} submitted
                              </span>
                            </div>
                            <Button size="sm" variant="outline">Review</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Schedule and Messages */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todaySchedule.map((item, index) => (
                    <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
                      item.status === 'current' ? 'bg-blue-50 border-blue-200 border' :
                      item.status === 'completed' ? 'bg-gray-50' : 'bg-white border'
                    }`}>
                      <div className={`w-3 h-3 rounded-full ${
                        item.status === 'current' ? 'bg-blue-500' :
                        item.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.time}</p>
                        <p className="text-sm text-gray-600">{item.class}</p>
                        <p className="text-xs text-gray-500">{item.room}</p>
                      </div>
                      {item.status === 'current' && (
                        <Clock className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Messages</CardTitle>
                  <Badge variant="secondary">2 new</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {messages.map((message, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${
                      message.unread ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-medium text-sm">{message.from}</p>
                        {message.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        )}
                      </div>
                      <p className="text-sm text-gray-700">{message.subject}</p>
                      <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  View All Messages
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TeacherDashboard;
