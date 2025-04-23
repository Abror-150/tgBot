import { Injectable, OnModuleInit } from '@nestjs/common';
import { BookService } from 'src/book/book.service';
import { UserService } from 'src/user/user.service';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class TgService implements OnModuleInit {
  private bot: Telegraf<Context>;
  constructor(
    private user: UserService,
    private book: BookService,
  ) {
    this.bot = new Telegraf('7938340239:AAF9ZBM6SJYkHy_8RwxedlAL_lDNeaIqGrY');
  }
  onModuleInit() {
    this.bot.start(async (ctx) => {
      const chatId = ctx.chat.id;
      const userId = ctx.from.id;
      const channelUsername = '@futbolOlami_8';
      try {
        const member = await this.bot.telegram.getChatMember(
          channelUsername,
          userId,
        );

        if (member.status == 'left' || member.status == 'kicked') {
          await ctx.reply(
            `Botdan foydalanish uchun avval bizning kanalga obuna bo'ling: ${channelUsername}`,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: '📢Kanalga obuna bolish',
                      url: `https://t.me/${channelUsername.replace('@', '')}`,
                    },
                  ],
                ],
              },
            },
          );
        } else {
          await this.user.findUser(ctx.from);

          await ctx.reply(
            "⚠️ ✅ Obuna tekshiruvdan o'tdi. Botga xush kelibsiz!",
          );
        }
      } catch (error) {
        await ctx.reply('⚠️ Obuna holatini tekshirishda xatolik yuz berdi.');
        console.log(error);
      }
    });
    this.bot.command('books', async (ctx) => {
      try {
        const books = await this.book.findAll();
        if (books.length === 0) {
          await ctx.reply('Hozirda kitoblar mavjud emas.');
        } else {
          const booksList = books.map((book) => `${book.name}`).join('\n');
          await ctx.reply(`kitoblar:\n${booksList}`);
        }
      } catch (error) {
        await ctx.reply('Kitoblarni olishda xatolik yuz berdi.');
        console.log(error);
      }
    });
    this.bot.command('deleteBook', async (ctx) => {
      const bookId = ctx.message.text.split(' ')[1];
      if (!bookId) {
        await ctx.reply(
          "Iltimos, o'chirmoqchi bo'lgan kitobning ID sini kiriting.",
        );
        return;
      }

      try {
        const deletedBook = await this.book.remove(bookId);
        if (deletedBook) {
          await ctx.reply(`Kitob "${deletedBook.name}" o'chirildi.`);
        } else {
          await ctx.reply('Bunday kitob topilmadi.');
        }
      } catch (error) {
        await ctx.reply("Kitobni o'chirishda xatolik yuz berdi.");
        console.log(error);
      }
    });
    this.bot.launch();
  }
}
