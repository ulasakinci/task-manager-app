/**
 * TaskCard Component - Görev kartı bileşeni
 * 
 * Tasarım: Modern Minimalist Produktivite
 * İmza Öğeleri: Yuvarlatılmış Kartlar, İnce Gölgeler, Geçiş Animasyonları
 */

import { Task, TaskStatus, TaskPriority } from '@/interfaces/Task';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2, CheckCircle2, Circle, Clock } from 'lucide-react';
import { useState } from 'react';
import { TaskForm } from './TaskForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const statusColors: Record<TaskStatus, string> = {
    'todo': 'bg-gray-100 text-gray-700',
    'in-progress': 'bg-orange-100 text-orange-700',
    'completed': 'bg-green-100 text-green-700',
  };

  const priorityColors: Record<TaskPriority, string> = {
    'low': 'border-l-4 border-blue-300',
    'medium': 'border-l-4 border-orange-400',
    'high': 'border-l-4 border-red-400',
  };

  const statusIcons: Record<TaskStatus, React.ReactNode> = {
    'todo': <Circle className="w-5 h-5" />,
    'in-progress': <Clock className="w-5 h-5" />,
    'completed': <CheckCircle2 className="w-5 h-5" />,
  };

  const statusLabels: Record<TaskStatus, string> = {
    'todo': 'Yapılacak',
    'in-progress': 'Devam Ediyor',
    'completed': 'Tamamlandı',
  };

  const priorityLabels: Record<TaskPriority, string> = {
    'low': 'Düşük',
    'medium': 'Orta',
    'high': 'Yüksek',
  };

  const handleStatusChange = () => {
    const statusCycle: Record<TaskStatus, TaskStatus> = {
      'todo': 'in-progress',
      'in-progress': 'completed',
      'completed': 'todo',
    };
    onUpdate(task.id, { status: statusCycle[task.status] });
  };

  return (
    <>
      <div
        className={`
          bg-white rounded-xl p-4 shadow-sm hover:shadow-md
          transition-all duration-200 ease-out
          hover:translate-y-[-2px]
          ${priorityColors[task.priority]}
        `}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Başlık */}
            <h3
              className={`
                text-base font-semibold mb-1 truncate
                ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-900'}
              `}
            >
              {task.title}
            </h3>

            {/* Açıklama */}
            {task.description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {task.description}
              </p>
            )}

            {/* Meta Bilgiler */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Durum Badge */}
              <button
                onClick={handleStatusChange}
                className={`
                  inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                  transition-colors duration-150
                  hover:opacity-80
                  ${statusColors[task.status]}
                `}
                title="Durumu değiştirmek için tıklayın"
              >
                {statusIcons[task.status]}
                {statusLabels[task.status]}
              </button>

              {/* Öncelik Badge */}
              <span className={`
                inline-block px-2 py-1 rounded-full text-xs font-medium
                ${task.priority === 'high' ? 'bg-red-100 text-red-700' : ''}
                ${task.priority === 'medium' ? 'bg-orange-100 text-orange-700' : ''}
                ${task.priority === 'low' ? 'bg-blue-100 text-blue-700' : ''}
              `}>
                {priorityLabels[task.priority]}
              </span>

              {/* Bitiş Tarihi */}
              {task.dueDate && (
                <span className="text-xs text-gray-500">
                  {new Date(task.dueDate).toLocaleDateString('tr-TR')}
                </span>
              )}
            </div>
          </div>

          {/* İşlem Butonları */}
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditOpen(true)}
              className="h-8 w-8 p-0"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(task.id)}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Düzenleme Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Görevi Düzenle</DialogTitle>
          </DialogHeader>
          <TaskForm
            initialTask={task}
            onSubmit={(updates: any) => {
              onUpdate(task.id, updates);
              setIsEditOpen(false);
            }}
            onCancel={() => setIsEditOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
