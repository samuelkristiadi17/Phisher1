import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import seaborn as sns
import numpy as np
from collections import Counter
import warnings
warnings.filterwarnings('ignore')

FILE_PATH = "phishsim_responses.csv"  


df = pd.read_csv(FILE_PATH)

df.columns = [
    'Timestamp', 'Q1_Checkbox', 'Q2_Familiar',
    'Q3_Warna', 'Q4_Layout', 'Q5_Yakin',
    'Q6_Meyakinkan', 'Q7_Overall',
    'Q8_Curiga', 'Q9_Elemen', 'Q10_Tertipu'
]

df = df.drop(columns=['Q1_Checkbox'])

print("=" * 60)
print("PHISHSIM — LAPORAN ANALISIS DATA KUESIONER")
print("=" * 60)
print(f"\nTotal responden: {len(df)}")
print(f"Periode data: {df['Timestamp'].iloc[0]} — {df['Timestamp'].iloc[-1]}")

likert_cols = ['Q3_Warna', 'Q4_Layout', 'Q5_Yakin', 'Q6_Meyakinkan', 'Q7_Overall']
likert_labels = [
    'Kemiripan Warna',
    'Kemiripan Layout',
    'Keyakinan Visual',
    'Tingkat Meyakinkan',
    'Kemiripan Keseluruhan'
]

print("\n" + "─" * 60)
print("SECTION A — KEMIRIPAN VISUAL (Skala 1–5)")
print("─" * 60)

stats = df[likert_cols].describe().T
stats.index = likert_labels
stats = stats[['mean', 'std', 'min', 'max']]
stats.columns = ['Rata-rata', 'Std Dev', 'Min', 'Max']
stats = stats.round(2)
print(stats.to_string())

overall_mean = df[likert_cols].mean().mean()
print(f"\n→ Rata-rata Similarity Score Keseluruhan: {overall_mean:.2f} / 5.00")

print("\n" + "─" * 60)
print("SECTION B — FREKUENSI PENGGUNAAN PINTEREST (Q2)")
print("─" * 60)
q2_counts = df['Q2_Familiar'].value_counts()
q2_pct = df['Q2_Familiar'].value_counts(normalize=True) * 100
q2_summary = pd.DataFrame({'Jumlah': q2_counts, 'Persentase (%)': q2_pct.round(1)})
print(q2_summary.to_string())

# Rata-rata similarity berdasarkan familiar/tidak
familiar_group = df[df['Q2_Familiar'] != 'Tidak pernah'][likert_cols].mean().mean()
not_familiar_group = df[df['Q2_Familiar'] == 'Tidak pernah'][likert_cols].mean().mean()
print(f"\n→ Rata-rata similarity (familiar Pinterest): {familiar_group:.2f} / 5.00")
print(f"→ Rata-rata similarity (tidak familiar): {not_familiar_group:.2f} / 5.00")

print("\n" + "─" * 60)
print("SECTION C — KESADARAN PHISHING (Q8)")
print("─" * 60)
q8_counts = df['Q8_Curiga'].value_counts()
q8_pct = df['Q8_Curiga'].value_counts(normalize=True) * 100
q8_summary = pd.DataFrame({'Jumlah': q8_counts, 'Persentase (%)': q8_pct.round(1)})
print(q8_summary.to_string())

print("\n" + "─" * 60)
print("SECTION D — ELEMEN YANG MENCURIGAKAN (Q9)")
print("─" * 60)

# Split checkbox responses
all_elements = []
for response in df['Q9_Elemen'].dropna():
    elements = [e.strip() for e in response.split(',')]
    all_elements.extend(elements)

element_counts = Counter(all_elements)
element_df = pd.DataFrame(element_counts.items(), columns=['Elemen', 'Jumlah'])
element_df = element_df.sort_values('Jumlah', ascending=False)
element_df['Persentase (%)'] = (element_df['Jumlah'] / len(df) * 100).round(1)
print(element_df.to_string(index=False))

print("\n" + "─" * 60)
print("SECTION E — POTENSI TERTIPU (Q10)")
print("─" * 60)
q10_counts = df['Q10_Tertipu'].value_counts()
q10_pct = df['Q10_Tertipu'].value_counts(normalize=True) * 100
q10_summary = pd.DataFrame({'Jumlah': q10_counts, 'Persentase (%)': q10_pct.round(1)})
print(q10_summary.to_string())


fig, axes = plt.subplots(2, 3, figsize=(18, 12))
fig.suptitle('PhishSim — Hasil Analisis Kuesioner Similarity Analyzer',
             fontsize=16, fontweight='bold', y=1.02)

colors_teal = '#1A5E57'
colors_red = '#E60023'
palette = ['#1A5E57', '#2E8B84', '#D0EBEA', '#F4A261', '#E76F51']

# Chart 1 — Bar chart rata-rata Likert per dimensi
ax1 = axes[0, 0]
means = df[likert_cols].mean()
bars = ax1.bar(likert_labels, means, color=colors_teal, edgecolor='white', linewidth=0.5)
ax1.set_ylim(0, 5)
ax1.set_title('Rata-rata Skor Kemiripan Visual\nper Dimensi (Skala 1–5)', fontweight='bold')
ax1.set_ylabel('Rata-rata Skor')
ax1.tick_params(axis='x', rotation=25)
for bar, val in zip(bars, means):
    ax1.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.05,
             f'{val:.2f}', ha='center', va='bottom', fontsize=10, fontweight='bold')
ax1.axhline(y=overall_mean, color=colors_red, linestyle='--', linewidth=1.5,
            label=f'Rata-rata keseluruhan: {overall_mean:.2f}')
ax1.legend(fontsize=9)

# Chart 2 — Pie chart Q2 familiar Pinterest
ax2 = axes[0, 1]
q2_counts.plot(kind='pie', ax=ax2, autopct='%1.1f%%',
               colors=palette, startangle=90,
               textprops={'fontsize': 9})
ax2.set_title('Frekuensi Penggunaan Pinterest\nResponden (Q2)', fontweight='bold')
ax2.set_ylabel('')

# Chart 3 — Pie chart Q8 kesadaran phishing
ax3 = axes[0, 2]
q8_colors = ['#E76F51', '#F4A261', '#1A5E57']
q8_counts.plot(kind='pie', ax=ax3, autopct='%1.1f%%',
               colors=q8_colors[:len(q8_counts)], startangle=90,
               textprops={'fontsize': 9})
ax3.set_title('Kesadaran Phishing Responden\nSebelum Diberitahu (Q8)', fontweight='bold')
ax3.set_ylabel('')

# Chart 4 — Bar chart Q9 elemen mencurigakan
ax4 = axes[1, 0]
element_df_sorted = element_df.sort_values('Jumlah')
bars4 = ax4.barh(element_df_sorted['Elemen'], element_df_sorted['Jumlah'],
                  color=colors_teal, edgecolor='white')
ax4.set_title('Elemen Paling Mencurigakan\nMenurut Responden (Q9)', fontweight='bold')
ax4.set_xlabel('Jumlah Responden')
for bar, val in zip(bars4, element_df_sorted['Jumlah']):
    ax4.text(bar.get_width() + 0.3, bar.get_y() + bar.get_height()/2,
             str(int(val)), va='center', fontsize=9)

# Chart 5 — Pie chart Q10 potensi tertipu
ax5 = axes[1, 1]
q10_colors = ['#1A5E57', '#F4A261', '#E76F51']
q10_counts.plot(kind='pie', ax=ax5, autopct='%1.1f%%',
                colors=q10_colors[:len(q10_counts)], startangle=90,
                textprops={'fontsize': 9})
ax5.set_title('Potensi Tertipu jika Tidak\nMengetahui Simulasi (Q10)', fontweight='bold')
ax5.set_ylabel('')

# Chart 6 — Perbandingan familiar vs tidak familiar
ax6 = axes[1, 2]
familiar_means = df[df['Q2_Familiar'] != 'Tidak pernah'][likert_cols].mean()
not_familiar_means = df[df['Q2_Familiar'] == 'Tidak pernah'][likert_cols].mean()

x = np.arange(len(likert_labels))
width = 0.35
bars6a = ax6.bar(x - width/2, familiar_means, width, label='Familiar Pinterest',
                  color=colors_teal, edgecolor='white')
bars6b = ax6.bar(x + width/2, not_familiar_means, width, label='Tidak Familiar',
                  color=colors_red, edgecolor='white', alpha=0.8)
ax6.set_ylim(0, 5)
ax6.set_title('Perbandingan Skor Kemiripan\nFamiliar vs Tidak Familiar (Q2 vs Q3–Q7)',
              fontweight='bold')
ax6.set_ylabel('Rata-rata Skor')
ax6.set_xticks(x)
ax6.set_xticklabels(likert_labels, rotation=25, fontsize=8)
ax6.legend(fontsize=9)

plt.tight_layout()
plt.savefig('phishsim_analysis_charts.png', dpi=150, bbox_inches='tight')
print("\n→ Chart disimpan sebagai: phishsim_analysis_charts.png")


# EXPORT RINGKASAN KE EXCEL
with pd.ExcelWriter('phishsim_analysis_report.xlsx', engine='openpyxl') as writer:
    # Sheet 1: Raw data
    df.to_excel(writer, sheet_name='Raw Data', index=False)
    # Sheet 2: Statistik Likert
    stats.to_excel(writer, sheet_name='Statistik Kemiripan Visual')
    # Sheet 3: Q2
    q2_summary.to_excel(writer, sheet_name='Q2 Familiar Pinterest')
    # Sheet 4: Q8
    q8_summary.to_excel(writer, sheet_name='Q8 Kesadaran Phishing')
    # Sheet 5: Q9
    element_df.to_excel(writer, sheet_name='Q9 Elemen Mencurigakan', index=False)
    # Sheet 6: Q10
    q10_summary.to_excel(writer, sheet_name='Q10 Potensi Tertipu')

print("→ Laporan Excel disimpan sebagai: phishsim_analysis_report.xlsx")
print("\n" + "=" * 60)
print("ANALISIS SELESAI")
print("=" * 60)


