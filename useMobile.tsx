/**
 * TaskStats Component - İstatistikler bileşeni
 * 
 * Tasarım: Modern Minimalist Produktivite
 * Temel Prensipler: Renkle İletişim, Hiyerarşik Netlik
 */

import { Task } from '@/interfaces/Task';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

interface TaskStatsProps {
  tasks: Task[];
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const stats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === 'todo').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  };

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">İstatistikler</h3>

      {/* Ana İstatistik */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Tamamlanma Oranı</span>
          <span className="text-2xl font-bold text-blue-600">{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* Durum Kartları */}
      <div className="space-y-3">
        {/* Yapılacak */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Circle className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Yapılacak</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">{stats.todo}</span>
        </div>

        {/* Devam Ediyor */}
        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-orange-400" />
            <span className="text-sm font-medium text-orange-700">Devam Ediyor</span>
          </div>
          <span className="text-lg font-semibold text-orange-900">{stats.inProgress}</span>
        </div>

        {/* Tamamlandı */}
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-green-700">Tamamlandı</span>
          </div>
          <span className="text-lg font-semibold text-green-900">{stats.completed}</span>
        </div>
      </div>

      {/* Toplam */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Toplam Görev</span>
          <span className="text-2xl font-bold text-blue-600">{stats.total}</span>
        </div>
      </div>
    </div>
  );
}
