import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SlonikModule } from './slonik';
import { createTypeParserPreset } from 'slonik';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CreatorModule } from './creator/creator.module';
import { PaymentModule } from './payment/payment.module';
import { TierModule } from './tier/tier.module';
import { FileModule } from './file/file.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { StripeModule } from './stripe/stripe.module';
import { PayoutModule } from './payout/payout.module';
import { AccessModule } from './access/access.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { AnonymousStrategy } from './auth/anonymous.strategy';
import { JwtStrategy } from './auth/jwt.strategy';
import { PollModule } from './poll/poll.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    SlonikModule.forRoot({
      connectionConfiguration: `postgres://${process.env.DB_USERNAME}:${
        process.env.DB_PASSWORD
      }@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      clientUserConfiguration: {
        maximumPoolSize: 60,
        typeParsers: [...createTypeParserPreset()],
      },
    }),
    AuthModule,
    UserModule,
    CreatorModule,
    PaymentModule,
    TierModule,
    FileModule,
    PostModule,
    CommentModule,
    StripeModule,
    PayoutModule,
    AccessModule,
    SubscriptionModule,
    PollModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, AnonymousStrategy],
})
export class AppModule {}
