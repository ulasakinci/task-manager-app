/**
 * TaskForm Component - Görev ekleme/düzenleme formu
 * 
 * Tasarım: Modern Minimalist Produktivite
 * Temel Prensipler: Hiyerarşik Netlik, Kullanıcı Dostu Arayüz
 */

import { useState } from 'react';
import { Task, TaskStatus, TaskPriority } from '@/interfaces/Task';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TaskFormProps {
  initialTask?: Task;
  onSubmit: (task: any) => void;
  onCancel?: () => void;
}

export function TaskForm({ initialTask, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [status, setStatus] = useState<TaskStatus>(initialTask?.status || 'todo');
  const [priority, setPriority] = useState<TaskPriority>(initialTask?.priority || 'medium');
  const [dueDate, setDueDate] = useState(initialTask?.dueDate || '');

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Lütfen görev başlığını girin');
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim() ? description.trim() : undefined,
      status,
      priority,
      dueDate: dueDate ? dueDate : undefined,
    };
    onSubmit(taskData);

    // Formu sıfırla (sadece yeni görev ekleme durumunda)
    if (!initialTask) {
      setTitle('');
      setDescription('');
      setStatus('todo');
      setPriority('medium');
      setDueDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Başlık */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium">
          Görev Başlığı *
        </Label>
        <Input
          id="title"
          placeholder="Örn: Proje raporunu tamamla"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-10"
        />
      </div>

      {/* Açıklama */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Açıklama
        </Label>
        <Textarea
          id="description"
          placeholder="Görev hakkında detaylı bilgi ekleyin..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-24 resize-none"
        />
      </div>

      {/* Durum ve Öncelik */}
      <div className="grid grid-cols-2 gap-4">
        {/* Durum */}
        <div className="space-y-2">
          <Label htmlFor="status" className="text-sm font-medium">
            Durum
          </Label>
          <Select value={status} onValueChange={(value) => setStatus(value as TaskStatus)}>
            <SelectTrigger id="status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">Yapılacak</SelectItem>
              <SelectItem value="in-progress">Devam Ediyor</SelectItem>
              <SelectItem value="completed">Tamamlandı</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Öncelik */}
        <div className="space-y-2">
          <Label htmlFor="priority" className="text-sm font-medium">
            Öncelik
          </Label>
          <Select value={priority} onValueChange={(value) => setPriority(value as TaskPriority)}>
            <SelectTrigger id="priority">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Düşük</SelectItem>
              <SelectItem value="medium">Orta</SelectItem>
              <SelectItem value="high">Yüksek</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bitiş Tarihi */}
      <div className="space-y-2">
        <Label htmlFor="dueDate" className="text-sm font-medium">
          Bitiş Tarihi
        </Label>
        <Input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="h-10"
        />
      </div>

      {/* Butonlar */}
      <div className="flex gap-2 justify-end pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            İptal
          </Button>
        )}
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          {initialTask ? 'Güncelle' : 'Görev Ekle'}
        </Button>
      </div>
    </form>
  );
}
