/**
 * TaskFilter Component - Filtreleme bileşeni
 * 
 * Tasarım: Modern Minimalist Produktivite
 * Temel Prensipler: Yapışkan Başlık, Kullanıcı Dostu Arayüz
 */

import { TaskStatus, TaskPriority } from '@/interfaces/Task';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

interface TaskFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: TaskStatus | 'all';
  onStatusChange: (status: TaskStatus | 'all') => void;
  priorityFilter: TaskPriority | 'all';
  onPriorityChange: (priority: TaskPriority | 'all') => void;
}

export function TaskFilter({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
}: TaskFilterProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 sticky top-0 z-10">
      <div className="space-y-3">
        {/* Arama */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Görev ara..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-10"
          />
        </div>

        {/* Filtreler */}
        <div className="grid grid-cols-2 gap-3">
          {/* Durum Filtresi */}
          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger className="h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Durumlar</SelectItem>
              <SelectItem value="todo">Yapılacak</SelectItem>
              <SelectItem value="in-progress">Devam Ediyor</SelectItem>
              <SelectItem value="completed">Tamamlandı</SelectItem>
            </SelectContent>
          </Select>

          {/* Öncelik Filtresi */}
          <Select value={priorityFilter} onValueChange={onPriorityChange}>
            <SelectTrigger className="h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Öncelikler</SelectItem>
              <SelectItem value="low">Düşük</SelectItem>
              <SelectItem value="medium">Orta</SelectItem>
              <SelectItem value="high">Yüksek</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
