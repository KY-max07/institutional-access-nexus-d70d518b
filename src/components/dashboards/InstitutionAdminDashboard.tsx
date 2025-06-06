import React, { useState } from 'react';
import Layout from '../Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, GraduationCap, UserPlus, BookOpen, Plus, Search, Edit, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const InstitutionAdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState('all');

  const stats = [
    { title: 'Total Teachers', value: '24', icon: GraduationCap, color: 'text-blue-600' },
    { title: 'Total Students', value: '1,247', icon: Users, color: 'text-green-600' },
    { title: 'Active Classes', value: '18', icon: BookOpen, color: 'text-purple-600' },
    { title: 'New Enrollments', value: '12', icon: UserPlus, color: 'text-orange-600' }
  ];

  const teachers = [
    { id: 1, name: 'James Thompson', email: 'james@school.com', subjects: ['Math', 'Physics'], classes: 5, status: 'Active' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@school.com', subjects: ['English', 'Literature'], classes: 4, status: 'Active' },
    { id: 3, name: 'Michael Chen', email: 'michael@school.com', subjects: ['Chemistry', 'Biology'], classes: 6, status: 'Active' },
    { id: 4, name: 'Emily Davis', email: 'emily@school.com', subjects: ['History', 'Geography'], classes: 3, status: 'On Leave' }
  ];

  const students = [
    { id: 1, name: 'Alex Rodriguez', email: 'alex@student.com', grade: '10th', attendance: '95%', status: 'Active' },
    { id: 2, name: 'Emma Watson', email: 'emma@student.com', grade: '11th', attendance: '92%', status: 'Active' },
    { id: 3, name: 'David Kim', email: 'david@student.com', grade: '9th', attendance: '88%', status: 'Active' },
    { id: 4, name: 'Sofia Martinez', email: 'sofia@student.com', grade: '12th', attendance: '97%', status: 'Active' }
  ];

  const classes = [
    { id: 1, name: 'Advanced Mathematics', teacher: 'James Thompson', students: 28, schedule: 'Mon/Wed/Fri 9:00 AM' },
    { id: 2, name: 'English Literature', teacher: 'Sarah Johnson', students: 32, schedule: 'Tue/Thu 10:00 AM' },
    { id: 3, name: 'Organic Chemistry', teacher: 'Michael Chen', students: 24, schedule: 'Mon/Wed/Fri 2:00 PM' },
    { id: 4, name: 'World History', teacher: 'Emily Davis', students: 30, schedule: 'Tue/Thu/Fri 11:00 AM' }
  ];

  const recentActivities = [
    { action: 'New student enrollment: Alex Rodriguez', time: '1 hour ago', type: 'enrollment' },
    { action: 'Teacher assigned: James Thompson to Advanced Math', time: '3 hours ago', type: 'assignment' },
    { action: 'Attendance report generated for Grade 10', time: '5 hours ago', type: 'report' },
    { action: 'Class schedule updated: English Literature', time: '1 day ago', type: 'schedule' }
  ];

  const handleAddTeacher = () => {
    toast.info("Add Teacher feature coming soon!");
  };

  const handleAddStudent = () => {
    toast.info("Add Student feature coming soon!");
  };

  const handleCreateClass = () => {
    toast.info("Create Class feature coming soon!");
  };

  const handleEdit = (type: string, id: number) => {
    toast.info(`Edit ${type} ID: ${id} - Feature coming soon!`);
  };

  const handleDelete = (type: string, id: number) => {
    toast.info(`Delete ${type} ID: ${id} - Feature coming soon!`);
  };

  const handleBulkImport = () => {
    toast.info("Bulk Import feature coming soon!");
  };

  const handleGenerateReports = () => {
    toast.info("Generate Reports feature coming soon!");
  };

  const handleAttendanceOverview = () => {
    toast.info("Attendance Overview feature coming soon!");
  };

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || teacher.subjects.includes(selectedSubject);
    return matchesSearch && matchesSubject;
  });

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || student.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  return (
    <Layout title="Institution Admin Dashboard">
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="teachers" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="teachers">Teachers</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="classes">Classes</TabsTrigger>
              </TabsList>

              <TabsContent value="teachers" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Teacher Management</CardTitle>
                        <CardDescription>Manage teachers and their assignments</CardDescription>
                      </div>
                      <Button onClick={handleAddTeacher}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Teacher
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 flex gap-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search teachers..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                      <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Filter by subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Subjects</SelectItem>
                          <SelectItem value="Math">Mathematics</SelectItem>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Science">Science</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      {filteredTeachers.map((teacher) => (
                        <div key={teacher.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h3 className="font-semibold">{teacher.name}</h3>
                            <p className="text-sm text-gray-600">{teacher.email}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {teacher.subjects.map((subject, index) => (
                                <Badge key={index} variant="outline" className="text-xs">{subject}</Badge>
                              ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{teacher.classes} classes assigned</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={teacher.status === 'Active' ? 'default' : 'secondary'}>
                              {teacher.status}
                            </Badge>
                            <Button variant="ghost" size="sm" onClick={() => handleEdit('teacher', teacher.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete('teacher', teacher.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
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
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Student Management</CardTitle>
                        <CardDescription>Manage students and track performance</CardDescription>
                      </div>
                      <Button onClick={handleAddStudent}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Student
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 flex gap-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search students..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                      <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Filter by grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Grades</SelectItem>
                          <SelectItem value="9th">9th Grade</SelectItem>
                          <SelectItem value="10th">10th Grade</SelectItem>
                          <SelectItem value="11th">11th Grade</SelectItem>
                          <SelectItem value="12th">12th Grade</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      {filteredStudents.map((student) => (
                        <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h3 className="font-semibold">{student.name}</h3>
                            <p className="text-sm text-gray-600">{student.email}</p>
                            <p className="text-sm text-gray-600">Grade: {student.grade} • Attendance: {student.attendance}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="default">{student.status}</Badge>
                            <Button variant="ghost" size="sm" onClick={() => handleEdit('student', student.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="classes" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Class Management</CardTitle>
                        <CardDescription>Manage classes and teacher assignments</CardDescription>
                      </div>
                      <Button onClick={handleCreateClass}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Class
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {classes.map((classItem) => (
                        <div key={classItem.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h3 className="font-semibold">{classItem.name}</h3>
                            <p className="text-sm text-gray-600">Teacher: {classItem.teacher}</p>
                            <p className="text-sm text-gray-600">{classItem.students} students • {classItem.schedule}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEdit('class', classItem.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete('class', classItem.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'enrollment' ? 'bg-green-500' :
                        activity.type === 'assignment' ? 'bg-blue-500' :
                        activity.type === 'report' ? 'bg-purple-500' : 'bg-orange-500'
                      }`} />
                      <div>
                        <p className="text-sm">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline" onClick={handleBulkImport}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Bulk Import Users
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={handleGenerateReports}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Generate Reports
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={handleAttendanceOverview}>
                  <Users className="mr-2 h-4 w-4" />
                  Attendance Overview
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InstitutionAdminDashboard;