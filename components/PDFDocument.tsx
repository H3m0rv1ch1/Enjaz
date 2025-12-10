import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { Member, Task } from '../types';

// Register Almarai font
Font.register({
  family: 'Almarai',
  src: '/Public/Almarai-Regular.ttf',
});

Font.register({
  family: 'Almarai-Bold',
  src: '/Public/Almarai-Bold.ttf',
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Almarai',
    backgroundColor: '#FFFFFF',
    direction: 'rtl',
  },
  header: {
    backgroundColor: '#047857',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Almarai-Bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#FFFFFF',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#D1FAE5',
    borderRadius: 6,
    padding: 12,
    textAlign: 'center',
  },
  summaryNumber: {
    fontSize: 20,
    fontFamily: 'Almarai-Bold',
    color: '#047857',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 9,
    color: '#6B7280',
  },
  dateText: {
    fontSize: 9,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#047857',
    borderRadius: 4,
    padding: 8,
    marginBottom: 4,
  },
  tableHeaderCell: {
    fontSize: 8,
    fontFamily: 'Almarai-Bold',
    color: '#FFFFFF',
    textAlign: 'right',
  },
  tableRow: {
    flexDirection: 'row',
    borderRadius: 4,
    padding: 8,
    marginBottom: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tableRowEven: {
    backgroundColor: '#FFFFFF',
  },
  tableRowOdd: {
    backgroundColor: '#F9FAFB',
  },
  tableCell: {
    fontSize: 8,
    color: '#1F2937',
    textAlign: 'right',
  },
  tableCellGray: {
    fontSize: 7,
    color: '#6B7280',
    textAlign: 'right',
  },
  nameCol: { width: '25%', paddingRight: 5 },
  levelCol: { width: '15%', paddingHorizontal: 5 },
  ratingCol: { width: '12%', paddingHorizontal: 5 },
  notesCol: { width: '28%', paddingHorizontal: 5 },
  tasksCol: { width: '20%', paddingLeft: 5 },
  levelBadge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    textAlign: 'center',
  },
  levelBadgeText: {
    fontSize: 7,
    fontFamily: 'Almarai-Bold',
    color: '#FFFFFF',
  },
  taskRow: {
    flexDirection: 'row',
    gap: 3,
    justifyContent: 'flex-start',
  },
  taskBox: {
    width: 10,
    height: 10,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskCompleted: {
    backgroundColor: '#047857',
  },
  taskIncomplete: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#6B7280',
  },
  checkmark: {
    fontSize: 6,
    color: '#FFFFFF',
    fontFamily: 'Almarai-Bold',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
    color: '#6B7280',
  },
});

interface PDFDocumentProps {
  members: Member[];
  tasks: Task[];
}

const getLevelColor = (level: string | null): string => {
  if (!level) return '#6B7280';
  
  const levelStr = String(level).trim();
  
  // Match exact Arabic text or substring
  if (levelStr === 'نشط' || levelStr.includes('نشط')) {
    return '#047857'; // Darker Green (Emerald 700) to match header
  }
  if (levelStr === 'متوسط' || levelStr.includes('متوسط')) {
    return '#F59E0B'; // Orange for Intermediate
  }
  if (levelStr === 'مبتدئ' || levelStr.includes('مبتدئ')) {
    return '#64748B'; // Gray for Beginner
  }
  
  return '#6B7280';
};

const PDFDocument: React.FC<PDFDocumentProps> = ({ members, tasks }) => {
  const avgRating = members.length > 0
    ? (members.reduce((sum, m) => sum + (parseFloat(m.finalRating) || 0), 0) / members.length).toFixed(1)
    : '0';

  const dateStr = new Date().toLocaleDateString('ar-EG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>تقرير Enjaz</Text>
          <Text style={styles.headerSubtitle}>تقرير أداء الفريق</Text>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>{avgRating}/10</Text>
            <Text style={styles.summaryLabel}>متوسط التقييم</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>{tasks.length}</Text>
            <Text style={styles.summaryLabel}>إجمالي المهام</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>{members.length}</Text>
            <Text style={styles.summaryLabel}>إجمالي الأعضاء</Text>
          </View>
        </View>

        {/* Date */}
        <Text style={styles.dateText}>تاريخ الإنشاء: {dateStr}</Text>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, styles.tasksCol, { textAlign: 'left' }]}>المهام</Text>
          <Text style={[styles.tableHeaderCell, styles.notesCol, { textAlign: 'center' }]}>الملاحظات</Text>
          <Text style={[styles.tableHeaderCell, styles.ratingCol, { textAlign: 'center' }]}>التقييم</Text>
          <Text style={[styles.tableHeaderCell, styles.levelCol, { textAlign: 'center' }]}>المستوى</Text>
          <Text style={[styles.tableHeaderCell, styles.nameCol, { textAlign: 'right' }]}>الاسم</Text>
        </View>

        {/* Table Rows */}
        {members.map((member, idx) => (
          <View
            key={member.id}
            style={[
              styles.tableRow,
              idx % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
            ]}
          >
            {/* Tasks */}
            <View style={[styles.tasksCol, styles.taskRow]}>
              {tasks.slice(0, 5).map((task) => {
                const memberTask = member.tasks.find((mt) => mt.taskId === task.id);
                const isCompleted = memberTask?.completed || false;
                return (
                  <View
                    key={task.id}
                    style={[
                      styles.taskBox,
                      isCompleted ? styles.taskCompleted : styles.taskIncomplete,
                    ]}
                  >
                    {isCompleted && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                );
              })}
            </View>

            {/* Notes */}
            <View style={styles.notesCol}>
              <Text style={[styles.tableCellGray, { textAlign: 'center' }]}>
                {member.notes
                  ? member.notes.length > 25
                    ? member.notes.substring(0, 25) + '..'
                    : member.notes
                  : '-'}
              </Text>
            </View>

            {/* Rating */}
            <View style={styles.ratingCol}>
              <Text style={[styles.tableCell, { textAlign: 'center' }]}>{member.finalRating || '0'}/10</Text>
            </View>

            {/* Level */}
            <View style={styles.levelCol}>
              {member.level ? (
                <View style={[styles.levelBadge, { backgroundColor: getLevelColor(String(member.level)), alignSelf: 'center' }]}>
                  <Text style={styles.levelBadgeText}>{String(member.level)}</Text>
                </View>
              ) : (
                <Text style={[styles.tableCellGray, { textAlign: 'center' }]}>-</Text>
              )}
            </View>

            {/* Name */}
            <View style={styles.nameCol}>
              <Text style={[styles.tableCell, { textAlign: 'right' }]}>{member.name}</Text>
            </View>
          </View>
        ))}

        {/* Footer */}
        <Text style={styles.footer} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>
    </Document>
  );
};

export default PDFDocument;
